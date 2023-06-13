
import './Notify.css'
import React, { useState } from 'react';

interface EventData {
  event_id: number;
  room_id: number;
  user_id: number;
  start_time: string;
  end_time: string;
  event_title: string;
  event_description: string;
}


function Notify() {
  const [data, setData] = useState<EventData[]>([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/labs'); // Ruta de la API para obtener los datos
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error al obtener los datos:', error);
    }
  };


  return (
    <>
     <div>
      <button onClick={fetchData}>Cargar datos</button>
      <table>
        <thead>
          <tr>
            <th>Event ID</th>
            <th>Room ID</th>
            <th>User ID</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Event Title</th>
            <th>Event Description</th>
          </tr>
        </thead>
        <tbody>
          {data.map((event) => (
            <tr key={event.event_id}>
              <td>{event.event_id}</td>
              <td>{event.room_id}</td>
              <td>{event.user_id}</td>
              <td>{event.start_time}</td>
              <td>{event.end_time}</td>
              <td>{event.event_title}</td>
              <td>{event.event_description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  )
}

export default Notify