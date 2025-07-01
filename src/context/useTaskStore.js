import { create } from 'zustand';

export const useTaskStore = create(set => ({
  tasks: [],
  addTask: task => set(state => ({ tasks: [task, ...state.tasks] })),
  updateStatus: (id, newStatus) =>
    set(state => ({
      tasks: state.tasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    }))
}));
