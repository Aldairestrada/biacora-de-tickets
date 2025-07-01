import { useState } from 'react';
import { useTaskStore } from '../context/useTaskStore';

function TaskForm() {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'media',
    category: '',
    dueDate: '',
    status: 'pendiente'
  });

  const addTask = useTaskStore(state => state.addTask);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (form.title.trim()) {
      addTask({ ...form, id: crypto.randomUUID() });
      setForm({
        title: '',
        description: '',
        priority: 'media',
        category: '',
        dueDate: '',
        status: 'pendiente'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Título" required />
      <input name="category" value={form.category} onChange={handleChange} placeholder="Categoría" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Descripción" />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="baja">Baja</option>
        <option value="media">Media</option>
        <option value="alta">Alta</option>
      </select>
      <input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
      <button type="submit">Agregar</button>
    </form>
  );
}

export default TaskForm;
