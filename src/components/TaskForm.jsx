import { useState } from 'react';
import axios from 'axios';
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

  const handleSubmit = async e => {
    e.preventDefault();
    if (form.title.trim()) {
      const newTask = { ...form, id: crypto.randomUUID() };

      try {
        const res = await axios.post('http://localhost/api_tickets/add_task.php', newTask, {
          headers: { 'Content-Type': 'application/json' }
        });

        console.log(res.data); // respuesta del servidor
        addTask(newTask);
        setForm({
          title: '',
          description: '',
          priority: 'media',
          category: '',
          dueDate: '',
          status: 'pendiente'
        });
      } catch (error) {
        console.error('Error al guardar la tarea:', error);
      }
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
