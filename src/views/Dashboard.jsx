import { useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import TaskForm from '../components/TaskForm';
import CategoryBadge from '../components/CategoryBadge';
import { useTaskStore } from '../context/useTaskStore';
import './Dashboard.css';
import Sidebar from '../components/Sidebar';

function Dashboard() {
  const { tasks, setTasks } = useTaskStore();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost/api_tickets/get_tasks.php');
        setTasks(res.data);
      } catch (error) {
        console.error('Error al obtener tareas:', error);
      }
    };
    fetchTasks();
  }, [setTasks]);

  const countByStatus = status =>
    tasks.filter(t => t.status === status).length;

  return (
    <div className="dashboard-container">
      <Sidebar />

      <main className="main-content">
        <header className="stats-bar">
          <div><strong>{t('pendientes')}:</strong> {countByStatus('pendiente')}</div>
          <div><strong>{t('en_proceso')}:</strong> {countByStatus('proceso')}</div>
          <div><strong>{t('resueltos')}:</strong> {countByStatus('resuelto')}</div>
        </header>

        <section className="form-section">
          <TaskForm />
        </section>

        <section className="table-section">
          <table className="task-table">
            <thead>
              <tr>
                <th>{t('descripcion')}</th>
                <th>{t('prioridad')}</th>
                <th>{t('fecha_limite')}</th>
                <th>{t('estado')}</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td>
                    <CategoryBadge category={t.category || 'General'} />
                    {t.title}
                  </td>
                  <td style={{
                    color:
                      t.priority === 'alta' ? '#e74c3c' :
                      t.priority === 'media' ? '#f39c12' :
                      '#27ae60',
                    fontWeight: 'bold'
                  }}>
                    {t.priority}
                  </td>
                  <td>{t.dueDate || '—'}</td>
                  <td>{t.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
