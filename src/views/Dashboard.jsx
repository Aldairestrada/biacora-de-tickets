import TaskForm from '../components/TaskForm';
import CategoryBadge from '../components/CategoryBadge';
import { useTaskStore } from '../context/useTaskStore';
import './Dashboard.css';

function Dashboard() {
  const { tasks } = useTaskStore();

  const countByStatus = status =>
    tasks.filter(t => t.status === status).length;

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h2>Tickets</h2>
        <ul>
          <li>Panel</li>
          <li>Reportes</li>
          <li>Configuración</li>
        </ul>
      </aside>

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
          <table className="task-table">
            <thead>
              <tr>
                <th>Descripción</th>
                <th>Prioridad</th>
                <th>Fecha Límite</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map(t => (
                <tr key={t.id}>
                  <td>
                    <CategoryBadge category={t.category || 'Pendiente'} />
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
