import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import axios from 'axios';
import './Sidebar.css';

function Sidebar() {
  const { t } = useTranslation();
  const [dateTime, setDateTime] = useState('');

  useEffect(() => {
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

    fetchDateTime();
    const interval = setInterval(fetchDateTime, 60000); // Actualiza cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <aside className="sidebar">
      <h2>Tickets</h2>
      <ul>
        <li><Link to="/dashboard">Panel</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/Configuracion">Configuración</Link></li>
      </ul>
      <div className="datetime">
        <p>{dateTime}</p>
      </div>
    </aside>
  );
}

export default Sidebar;
