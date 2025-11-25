import { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import CategoryBadge from '../components/CategoryBadge';
import { useTaskStore } from '../context/useTaskStore';
import Sidebar from '../components/Sidebar_admin';
import { generarPDFTicket } from '../utils/pdfUtils';
import MapView from '../components/MapView.jsx';
import { useTranslation } from 'react-i18next';

import './Dashboard.css';

function Dashboard() {
  const { t } = useTranslation();
  const tasks = useTaskStore((state) => state.tasks);
  const setTasks = useTaskStore((state) => state.setTasks);
  const updateTaskStatus = useTaskStore((state) => state.updateTaskStatus);

  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost/api_tickets/get_tasks.php');
        const data = Array.isArray(res.data) ? res.data : [];
        const clonedTasks = data.map(task => ({ ...task }));
        setTasks(clonedTasks);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
        setTasks([]);
      }
    };

    fetchTasks();
  }, [setTasks]);

  useEffect(() => {
    const handleResize = () => {
      setIsSidebarOpen(window.innerWidth > 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleStatusChange = async (taskId, newStatus) => {
    try {
      await axios.post('http://localhost/api_tickets/update_status.php', {
        id: taskId,
        status: newStatus
      });
      updateTaskStatus(taskId, newStatus);
    } catch (error) {
      console.error('Error al actualizar el estado:', error);
    }
  };

  const countByStatus = status =>
    Array.isArray(tasks)
      ? tasks.filter(task => task.status === status).length
      : 0;

  return (
    <div className="dashboard-container">
      {window.innerWidth <= 768 && (
        <button className="toggle-button" onClick={toggleSidebar}>
          ☰
        </button>
      )}

      {isSidebarOpen && <Sidebar />}

      <main className={`main-content ${isSidebarOpen ? 'with-sidebar' : 'full-width'}`}>
        <header className="stats-bar">
          <div><strong>{t('dashboard.pending')}:</strong> {countByStatus('pendiente')}</div>
          <div><strong>{t('dashboard.inProgress')}:</strong> {countByStatus('proceso')}</div>
          <div><strong>{t('dashboard.resolved')}:</strong> {countByStatus('resuelto')}</div>
        </header>

        <section className="table-section">
          <h2>{t('dashboard.ticketList')}</h2>
          <table className="task-table">
            <thead>
              <tr>
                <th>{t('dashboard.description')}</th>
                <th>{t('dashboard.priority')}</th>
                <th>{t('dashboard.dueDate')}</th>
                <th>{t('dashboard.status')}</th>
                <th>{t('dashboard.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tasks) && tasks.map(task => (
                <tr key={task.id}>
                  <td>
                    <CategoryBadge category={task.category || t('dashboard.general')} />
                    {task.title}
                  </td>
                  <td style={{
                    color:
                      task.priority === 'alta' ? '#e74c3c' :
                      task.priority === 'media' ? '#f39c12' :
                      '#27ae60',
                    fontWeight: 'bold'
                  }}>
                    {t('dashboard.priority_' + task.priority)}
                  </td>
                  <td>{task.dueDate || '—'}</td>
                  <td>
                    <select
                      value={task.status}
                      onChange={e => handleStatusChange(task.id, e.target.value)}
                    >
                      <option value="pendiente">{t('dashboard.pending')}</option>
                      <option value="proceso">{t('dashboard.inProgress')}</option>
                      <option value="resuelto">{t('dashboard.resolved')}</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className="btn-ticket"
                      onClick={() => generarPDFTicket(task)}
                    >
                      📄 {t('dashboard.generatePDF')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {tasks.length > 0 && (
            <div className="map-section">
              <MapView
                lat={tasks[0].lat || 20.57666}
                lng={tasks[0].lng || -101.19700}
              />
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
