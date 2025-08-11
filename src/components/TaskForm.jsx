import { useState } from 'react';
import axios from 'axios';
import { useTaskStore } from '../context/useTaskStore';
import { useTranslation } from 'react-i18next';

function TaskForm() {
  const { t } = useTranslation();

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

        console.log(res.data);
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
        console.error(t('taskForm.error'), error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder={t('taskForm.title')}
        required
      />
      <input
        name="category"
        value={form.category}
        onChange={handleChange}
        placeholder={t('taskForm.category')}
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder={t('taskForm.description')}
      />
      <select name="priority" value={form.priority} onChange={handleChange}>
        <option value="baja">{t('taskForm.priority_low')}</option>
        <option value="media">{t('taskForm.priority_medium')}</option>
        <option value="alta">{t('taskForm.priority_high')}</option>
      </select>
      <input
        type="date"
        name="dueDate"
        value={form.dueDate}
        onChange={handleChange}
      />
      <button type="submit">{t('taskForm.submit')}</button>
    </form>
  );
}

export default TaskForm;
