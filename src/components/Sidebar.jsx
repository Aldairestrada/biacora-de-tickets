import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';
import logo from '../assets/logo sistema_tickets.png'; // Ajusta la ruta según tu estructura de carpetas

function Sidebar() {
  const { t } = useTranslation();
  const [dateTime, setDateTime] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // ⏰ Obtener fecha y hora
    const fetchDateTime = async () => {
      try {
        const res = await axios.get('https://worldtimeapi.org/api/timezone/America/Mexico_City');
        const rawDateTime = res.data.datetime;
        const dateObj = new Date(rawDateTime);

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = dateObj.toLocaleDateString('es-MX', options);
        const formattedTime = dateObj.toLocaleTimeString('es-MX', {
          hour: '2-digit',
          minute: '2-digit',
        });

        setDateTime(`${formattedDate} - ${formattedTime}`);
      } catch (error) {
        console.error('Error al obtener la hora:', error);
        setDateTime('No disponible');
      }
    };

    // 📧 Obtener el email guardado
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
    }

    fetchDateTime();
    const interval = setInterval(fetchDateTime, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>Tickets</h2>
      <ul>
        <li><Link to="/dashboard">Panel</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/documentacion">Documentación</Link></li>
        <li><Link to="/Configuracion">Configuración</Link></li>
      </ul>
      <div className="datetime">
        <p>{dateTime}</p>
      </div>
      <div className="user-email">
        <p>Sesión iniciada como: <strong>{userEmail}</strong></p>
      </div>
    </aside>
  );
}

export default Sidebar;
