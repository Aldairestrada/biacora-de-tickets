import { create } from 'zustand';

export const useTaskStore = create((set) => ({
  tasks: [],

  addTask: (task) =>
    set((state) => ({
      tasks: Array.isArray(state.tasks)
        ? [...state.tasks, task]
        : [task],
    })),

  setTasks: (tasks) =>
    set({
      tasks: Array.isArray(tasks) ? tasks : [],
    }),

  updateTaskStatus: (taskId, newStatus) =>
    set((state) => ({
      tasks: state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
              category: typeof task.category === 'object'
                ? { ...task.category }
                : task.category,
            }
          : { ...task }
      ),
    })),
}));


