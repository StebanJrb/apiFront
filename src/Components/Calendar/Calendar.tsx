import { useEffect, useState } from 'react'
import './Calendar.css'

function Calendar() {
  const [today, setToday] = useState(new Date());
  const [activeDay, setActiveDay] = useState<number>();
  const [month, setMonth] = useState<number>(today.getMonth());
  const [year, setYear] = useState<number>(today.getFullYear());
  const day = today.toString().substring(0, 3);

  const [event_description, setEventName] = useState('');
  const [start_time, setEventTimeFrom] = useState('');
  const [end_time, setEventTimeTo] = useState('');


  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  console.log("day = ", day, "mes = ", months[month], "año =", year);
  const eventsArr: any[] = [];

  console.log(eventsArr);

  useEffect(() => {
    initCalendar();
  }, [month, year]);

  const initCalendar = () => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    // Update the date element
    const dateElement = document.querySelector(".date");
    if (dateElement) {
      dateElement.innerHTML = months[month] + " " + year;
    }

    let days = "";

    for (let x = day; x > 0; x--) {
      days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
      // Check if event is present on that day
      let event = false;
      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month === month + 1 &&
          eventObj.year === year
        ) {
          event = true;
        }
      });

      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        setActiveDay(i);
        getActiveDay(i);
        updateEvents(i);
        if (event) {
          days += `<div class="day today active event">${i}</div>`;
        } else {
          days += `<div class="day today active">${i}</div>`;
        }
      } else {
        if (event) {
          days += `<div class="day event">${i}</div>`;
        } else {
          days += `<div class="day">${i}</div>`;
        }
      }
    }

    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="day next-date">${j}</div>`;
    }

    const daysContainer = document.querySelector(".days");
    if (daysContainer) {
      daysContainer.innerHTML = days;
    }

    addListner();
  };

  const prevMonth = () => {
    let updatedMonth = month - 1;
    let updatedYear = year;
    if (updatedMonth < 0) {
      updatedMonth = 11;
      updatedYear--;
    }
    setMonth(updatedMonth);
    setYear(updatedYear);
  };

  const nextMonth = () => {
    let updatedMonth = month + 1;
    let updatedYear = year;
    if (updatedMonth > 11) {
      updatedMonth = 0;
      updatedYear++;
    }
    setMonth(updatedMonth);
    setYear(updatedYear);
  };

  const addListner = () => {
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");

    if (prevButton) {
      prevButton.addEventListener("click", prevMonth);
    }

    if (nextButton) {
      nextButton.addEventListener("click", nextMonth);
    }
  };

  const getEvents = () => {
    // Function to fetch events
  };

  const getActiveDay = (day: number) => {
    // Function to handle active day
  };

  const updateEvents = (day: number) => {
    // Function to update events
  };

  const handleEventNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventName(event.target.value);
  }

  const handleEventTimeFromChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventTimeFrom(event.target.value);
  }

  const handleEventTimeToChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEventTimeTo(event.target.value);
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Crear objeto de datos a enviar al backend
    const room_id =  "Redes y procesadores";
	  const user_id = "1";
	  //const start_time = "1200",
	  //const end_time = "1400",
	  const event_title ="practica libre";
	  //const event_description": "1 osciloscopio"


    const eventData = {
      room_id,
      user_id,
      start_time,
      end_time,
      event_title,
      event_description
    };

    // Realizar la solicitud de inserción en la base de datos
    fetch('http://localhost:3000/api/labs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    })
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta del backend si es necesario
        console.log(data);
      })
      .catch(error => {
        // Manejar el error si ocurre
        console.error(error);
      });
  }


  return (
    <div className="container">
      <div className="left">
        <div className="calendar">
          <div className="month">
            <i className="fas fa-angle-left prev"></i>
            <div className="date">december 2015</div>
            <i className="fas fa-angle-right next"></i>
          </div>
          <div className="weekdays">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>
          <div className="days"></div>
          <div className="goto-today">
            <div className="goto">
              <input type="text" placeholder="mm/yyyy" className="date-input" />
              <button className="goto-btn">Go</button>
            </div>
            <button className="today-btn">Today</button>
          </div>
        </div>
      </div>
      <div className="right">
        <div className="today-date">
          <div className="event-day">{day}</div>
          <div className="event-date">{months[month] + " " + year}</div>
        </div>
        <div className="events"></div>
        <div className="add-event-wrapper">
          <div className="add-event-header">
            <div className="title">Add Event</div>
            <i className="fas fa-times close"></i>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="add-event-body">
              <div className="add-event-input">
                <input type="text" placeholder="Event Name" className="event-name" value={event_description}
                  onChange={handleEventNameChange} />
              </div>
              <div className="add-event-input">
                <input type="text" placeholder="Event Time From" className="event-time-from" value={start_time}
                  onChange={handleEventTimeFromChange} />
              </div>
              <div className="add-event-input">
                <input type="text" placeholder="Event Time To" className="event-time-to" value={end_time}
                  onChange={handleEventTimeToChange} />
              </div>
              <div className="add-event-footer">
                <button type="submit">Enviar</button>
              </div>
            </div>
          </form>
          <div className="add-event-footer">
            <button className="add-event-btn">Add Event</button>
          </div>
        </div>
      </div>
      <button className="add-event">
        <i className="fas fa-plus"></i>
      </button>
    </div>
  );

}

export default Calendar
