import { useEffect } from 'react'
import upcLogo from '../../assets/logo-upc.jpg'


import './Nav.css'

function Nav() {

  useEffect(() => {
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = 'https://unpkg.com/boxicons@2.1.1/css/boxicons.min.css';
    document.head.appendChild(linkElement);

    return () => {
      document.head.removeChild(linkElement);
    };
  }, []);


  const toggleSidebar = () => {

    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.toggle("close");
    }
  };

  const openSidebar = () => {
    const sidebar = document.querySelector(".sidebar");
    if (sidebar) {
      sidebar.classList.remove("close");
    }
  };

  return (
    <>
      <nav className="sidebar close">
        <header>
            <div className="image-text">
                <span className="image">
                    <img src={upcLogo} alt="UPC logo"/>
                </span>

                <div className="text logo-text">
                    <span className="name">Uni... Piloto</span>
                    <span className="profession">Estudiante</span>
                </div>
            </div>

            <i className='bx bx-chevron-right toggle' onClick={toggleSidebar}></i>
        </header>

        <div className="menu-bar">
            <div className="menu">

                <li className="search-box" onClick={openSidebar}>
                    <i className='bx bx-search icon'></i>
                    <input type="text" placeholder='Search' />
                </li>

                <ul className="menu-links">
                    <li className="nav-link">
                        <a href='/home'>
                            <i className='bx bx-home-alt icon'></i>
                            <span className="text nav-text">Inicio</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/home/calendar">
                            <i className='bx bx-bar-chart-alt-2 icon'></i>
                            <span className="text nav-text">Reservar</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="/home/notify">
                            <i className='bx bx-bell icon'></i>
                            <span className="text nav-text">Notifications</span>
                        </a>
                    </li>

                    <li className="nav-link">
                        <a href="#">
                            <i className='bx bx-pie-chart-alt icon'></i>
                            <span className="text nav-text">Historial</span>
                        </a>
                    </li>


                </ul>
            </div>
            <div className="bottom-content">
                <li className="">
                    <a href="/login">
                        <i className='bx bx-log-out icon'></i>
                        <span className="text nav-text">Logout</span>
                    </a>
                </li>

            </div>
        </div>

    </nav>

    
    
    </>
  )
}

export default Nav
