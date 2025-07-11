import { useEffect, useState } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import Sidebar from '../components/Sidebar';
import './Reporte.css';
import {
  generarReporteGeneral,
  generarReporteIndividual
} from '../utils/usePDFReport';

function Reporte() {
  const [tasks, setTasks] = useState([]);
  const { t } = useTranslation();

  useEffect(() => {
    axios.get('http://localhost/api_tickets/get_tasks.php')
      .then(res => {
        if (Array.isArray(res.data)) setTasks(res.data);
        else console.error('Respuesta inesperada:', res.data);
      })
      .catch(err => console.error('Error al cargar datos:', err));
  }, []);

  const totalPorEstado = estado => tasks.filter(t => t.status === estado).length;
  const totalPorPrioridad = p => tasks.filter(t => t.priority === p).length;
  const totalPorCategoria = c => tasks.filter(t => t.category === c).length;
  const categorias = [...new Set(tasks.map(t => t.category).filter(Boolean))];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <h2 className="reporte-title"> {t('reporte_general_titulo')}</h2>

        <div style={{ marginBottom: '2rem' }}>
          <button
            onClick={() => generarReporteGeneral(tasks, t)}
            className="btn-reporte"
          >
            📄 {t('generar_reporte_general')}
          </button>

          <select
            onChange={(e) => {
              const ticket = tasks.find(t => t.id === e.target.value);
              if (ticket) generarReporteIndividual(ticket, t);
            }}
            className="select-ticket"
            defaultValue=""
          >
            <option value="" disabled>🔍 {t('selecciona_ticket')}</option>
            {tasks.map(t => (
              <option key={t.id} value={t.id}>
                {t.title} ({t.id.slice(0, 6)})
              </option>
            ))}
          </select>
        </div>

        <section className="reporte-section">
          <h3>{t('por_estado')}</h3>
          <div className="reporte-cards">
            <div className="card estado-pendiente">{t('pendientes')}: {totalPorEstado('pendiente')}</div>
            <div className="card estado-proceso">{t('en_proceso')}: {totalPorEstado('proceso')}</div>
            <div className="card estado-resuelto">{t('resueltos')}: {totalPorEstado('resuelto')}</div>
          </div>
        </section>

        <section className="reporte-section">
          <h3>{t('por_prioridad')}</h3>
          <div className="reporte-cards">
            <div className="card prioridad-alta">{t('alta')}: {totalPorPrioridad('alta')}</div>
            <div className="card prioridad-media">{t('media')}: {totalPorPrioridad('media')}</div>
            <div className="card prioridad-baja">{t('baja')}: {totalPorPrioridad('baja')}</div>
          </div>
        </section>

        <section className="reporte-section">
          <h3>{t('por_categoria')}</h3>
          <ul className="reporte-categorias">
            {categorias.map(cat => (
              <li key={cat}><strong>{cat}</strong>: {totalPorCategoria(cat)}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}

export default Reporte;
