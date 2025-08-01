import { useEffect } from 'react';
import axios from 'axios';
import TaskForm from '../components/TaskForm';
import CategoryBadge from '../components/CategoryBadge';
import { useTaskStore } from '../context/useTaskStore';
import Sidebar from '../components/Sidebar';
import { generarPDFTicket } from '../utils/pdfUtils';

import './Dashboard.css';

function Dashboard() {
  const { tasks, setTasks } = useTaskStore();

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
          <div><strong>Pendientes:</strong> {countByStatus('pendiente')}</div>
          <div><strong>En proceso:</strong> {countByStatus('proceso')}</div>
          <div><strong>Resueltos:</strong> {countByStatus('resuelto')}</div>
        </header>

        <section className="form-section">
          <TaskForm />
        </section>

        <section className="table-section">
          <h2> Lista de Tickets</h2>
          <table className="task-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Prioridad</th>
                <th>Fecha Límite</th>
                <th>Estado</th>
                <th>Acciones</th>
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
                  <td>
                    <button
                      className="btn-ticket"
                      onClick={() => generarPDFTicket(t)}
                    >
                      📄 Generar PDF 
                    </button>
                  </td>
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
