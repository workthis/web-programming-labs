import { useState } from "react";
import type { Task, TaskStatus } from "./types/task";
import type { TaskFormData } from "./components/TaskForm/TaskForm";
import TaskForm from "./components/TaskForm/TaskForm";
import TaskList from "./components/TaskList/TaskList";
import styles from "./App.module.css";

const VARIANT = 13; 

const INITIAL_TASKS: Task[] = [
  {
    id: `task-${VARIANT}-1`,
    title: `Задача А-${VARIANT}: налаштування`,
    description: "Встановити Node.js, VS Code та необхідні розширення",
    status: "done",
    priority: "high",
    createdAt: new Date(2025, 0, (VARIANT % 28) + 1),
  },
  {
    id: `task-${VARIANT}-2`,
    title: `Задача Б-${VARIANT}: вивчення документації`,
    description: "Ознайомитись з документацією React",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date(2025, 1, (VARIANT % 28) + 1),
  },
  {
    id: `task-${VARIANT}-3`,
    title: `Задача В-${VARIANT}: написати компонент`,
    description: "",
    status: "todo",
    priority: "low",
    createdAt: new Date(2025, 2, (VARIANT % 28) + 1),
  },
];

function App() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [filter, setFilter] = useState<TaskStatus | "all">("all");

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      ...data,
      id: crypto.randomUUID(),
      status: "todo",
      createdAt: new Date(),
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const handleStatusChange = (id: string, status: TaskStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status } : task))
    );
  };

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <h1>Task Manager</h1>
        <div className={styles.stats}>
          <p>Всього: <strong>{tasks.length}</strong></p>
          <span className={styles.divider}>|</span>
          <p>Нові: <span className={styles.todoCount}>{tasks.filter((t) => t.status === "todo").length}</span></p>
          <span className={styles.divider}>|</span>
          <p>В роботі: <span className={styles.progressCount}>{tasks.filter((t) => t.status === "in-progress").length}</span></p>
          <span className={styles.divider}>|</span>
          <p>Виконані: <span className={styles.doneCount}>{tasks.filter((t) => t.status === "done").length}</span></p>
        </div>
      </header>

      <main className={styles.main}>
        <aside className={styles.sidebar}>
          <h2 className={styles.sectionTitle}>Створити задачу</h2>
          <TaskForm onSubmit={handleAddTask} />
        </aside>

        <section className={styles.content}>
          <div className={styles.filters}>
            <label htmlFor="filter">Фільтрувати за статусом:</label>
            <select
              id="filter"
              value={filter}
              onChange={(e) => setFilter(e.target.value as TaskStatus | "all")}
            >
              <option value="all">Усі</option>
              <option value="todo">Нові</option>
              <option value="in-progress">В роботі</option>
              <option value="done">Виконані</option>
            </select>
          </div>

          <TaskList
            tasks={filteredTasks}
            onDelete={handleDeleteTask}
            onStatusChange={handleStatusChange}
          />
        </section>
      </main>
    </div>
  );
}

export default App;