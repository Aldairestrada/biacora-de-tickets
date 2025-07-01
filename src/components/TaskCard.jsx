function TaskCard({ task, onChangeStatus }) {
    const next = {
      pendiente: 'proceso',
      proceso: 'resuelto',
      resuelto: null
    };
  
    return (
      <div style={{ border: '1px solid #ccc', padding: '1rem', margin: '0.5rem', background: '#fefefe' }}>
        <h4>{task.title}</h4>
        <p>{task.description}</p>
        <p>Prioridad: {task.priority}</p>
        <p>Vence: {task.dueDate}</p>
        {next[task.status] && (
          <button onClick={() => onChangeStatus(task.id, next[task.status])}>
            Mover a {next[task.status]}
          </button>
        )}
      </div>
    );
  }
  
  export default TaskCard;
  