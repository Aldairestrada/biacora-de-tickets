import { useTaskStore } from '../context/useTaskStore';
import TaskCard from './TaskCard';

function TaskBoard() {
  const { tasks, updateStatus } = useTaskStore();

  const renderColumn = (label, status) => (
    <div style={{ flex: 1, margin: '1rem' }}>
      <h3>{label}</h3>
      {tasks.filter(t => t.status === status).map(task => (
        <TaskCard key={task.id} task={task} onChangeStatus={updateStatus} />
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      {renderColumn('Pendiente', 'pendiente')}
      {renderColumn('En Proceso', 'proceso')}
      {renderColumn('Resuelto', 'resuelto')}
    </div>
  );
}

export default TaskBoard;
