import { create } from 'zustand';
import { Task } from '../types/Task';
import { INITIAL_TASKS } from '../data/initialTasks';

interface TasksStore {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: string) => void;
  updateTask: (updatedTask: Task) => void;
}

export const useTasksStore = create<TasksStore>((set) => ({
  tasks: INITIAL_TASKS,

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),

  updateTask: (updatedTask) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === updatedTask.id ? updatedTask : t
      ),
    })),
}));