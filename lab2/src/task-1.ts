export {}; // Робимо файл ізольованим

// 1.1
type Status = "todo" | "in_progress" | "done" | "cancelled";

// 1.2
type Priority = "low" | "medium" | "high" | "critical";

// 1.3. Основний інтерфейс
interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null; // Використовуємо null
  createdAt: Date;
  dueDate: Date | null;
}

// 1.4. Інтерфейси
interface HasId {
  id: number;
}

interface Project extends HasId {
  name: string;
  description: string;
  tasks: Task[];
  ownerId: number;
}

/**
 * 1.5. Функція для збору статистики
 */
function getTaskStats(tasks: Task[]) {
  const now = new Date();

  const stats = {
    total: tasks.length,
    byStatus: {
      todo: 0,
      in_progress: 0,
      done: 0,
      cancelled: 0,
    } as Record<Status, number>,
    overdue: 0,
  };

  tasks.forEach((task) => {
    stats.byStatus[task.status]++;

    if (
      task.dueDate &&
      task.dueDate < now &&
      task.status !== "done" &&
      task.status !== "cancelled"
    ) {
      stats.overdue++;
    }
  });

  return stats;
}

/**
 * 1.6. Функція для гарного виводу
 */
function formatTask(task: Task): string {
  return `[#${task.id}] ${task.title} (${task.priority}, ${task.status})`;
}

const mockTasks: Task[] = [
  {
    id: 1,
    title: "Нлаштувати CI/CD",
    description: "Налаштувати автоматичний деплой",
    status: "in_progress",
    priority: "high",
    assignee: "Олексій",
    createdAt: new Date("2024-03-01"),
    dueDate: new Date("2024-03-10"), // Протермінована
  },
  {
    id: 2,
    title: "Написати тести",
    description: "Покрити тестами API",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2024-03-05"),
    dueDate: new Date("2024-03-20"),
  },
  {
    id: 3,
    title: "Виправити баг з авторизацією",
    description: "Користувачі не можуть увійти через GitHub",
    status: "done",
    priority: "critical",
    assignee: "Марія",
    createdAt: new Date("2024-03-02"),
    dueDate: new Date("2024-03-05"),
  },
  {
    id: 4,
    title: "Оновити документацію",
    description: "Додати опис нових ендав",
    status: "cancelled",
    priority: "low",
    assignee: "Іван",
    createdAt: new Date("2024-03-01"),
    dueDate: null,
  },
  {
    id: 5,
    title: "Підготувати реліз",
    description: "Зібрати всі зміни в одну гілку",
    status: "todo",
    priority: "high",
    assignee: null,
    createdAt: new Date("2024-03-12"),
    dueDate: new Date("2024-03-13"), // Протермінована (якщо сьогодні 14-те)
  },
];

console.log("=== Завдання 1: Базові типи, інтерфейси та type aliases ===");

console.log("\nСписок задач:");
mockTasks.forEach((t) => console.log(formatTask(t)));

console.log("\nСтатистика:");
const stats = getTaskStats(mockTasks);
console.log(`Всього задач: ${stats.total}`);
console.log(`Протерміновано: ${stats.overdue}`);
console.table(stats.byStatus);