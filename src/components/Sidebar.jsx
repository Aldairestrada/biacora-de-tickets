import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Sidebar.css'; // si quieres aplicarle estilo

function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="sidebar">
      <h2>Tickets</h2>
      <ul>
        <li><Link to="/">Panel</Link></li>
        <li><Link to="/reportes">Reportes</Link></li>
        <li><Link to="/Configuracion">Configuración</Link></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
