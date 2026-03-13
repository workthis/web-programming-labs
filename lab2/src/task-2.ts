import { VARIANT } from "./config";

//Базові типи
type Status = "todo" | "in_progress" | "done" | "cancelled";
type Priority = "low" | "medium" | "high" | "critical";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

//Масив задач
const tasks: Task[] = [
  {
    id: 1 + VARIANT,
    title: "Розробити API",
    description: "Реалізувати REST API для управління задачами",
    status: "in_progress",
    priority: "high",
    assignee: "Іван Петренко",
    createdAt: new Date("2025-01-10"),
    dueDate: new Date("2025-02-01"),
  },
  {
    id: 2 + VARIANT,
    title: "Написати тестi",
    description: "Покрити unit-тестами основну логіку",
    status: "todo",
    priority: "medium",
    assignee: null,
    createdAt: new Date("2025-01-12"),
    dueDate: new Date("2025-02-15"),
  },
  {
    id: 3 + VARIANT,
    title: "Налаштувати БД",
    description: "Підключити PostgreSQL, виконати міграції",
    status: "done",
    priority: "critical",
    assignee: "Олена Коваль",
    createdAt: new Date("2025-01-05"),
    dueDate: new Date("2025-01-20"),
  },
  {
    id: 4 + VARIANT,
    title: "Оновити документацію",
    description: "Описати API у Swagger",
    status: "todo",
    priority: "low",
    assignee: null,
    createdAt: new Date("2025-01-15"),
    dueDate: null,
  },
  {
    id: 5 + VARIANT,
    title: "Code review",
    description: "Перевірити pull request від команди",
    status: "cancelled",
    priority: "medium",
    assignee: "Андрій Лисенко",
    createdAt: new Date("2025-01-18"),
    dueDate: new Date("2025-01-25"),
  },
];

//2.1
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  timestamp: Date;
}

// Функція відповіді
function createSuccessResponse<T>(data: T): ApiResponse<T> {
  return {
    data,
    status: 200,
    message: "Success",
    timestamp: new Date(),
  };
}

function createErrorResponse<T>(message: string): ApiResponse<T | null> {
  return {
    data: null,
    status: 400,
    message,
    timestamp: new Date(),
  };
}


// Omit видаляє id
type CreateTaskDto = Omit<Task, "id" | "createdAt">;
type UpdateTaskDto = Partial<CreateTaskDto>;
function filterTasks<K extends keyof Task>(tasks: Task[], key: K, value: Task[K]): Task[] {
  return tasks.filter((task) => task[key] === value);
}


console.log("=== Завдання 2: Generics та Utility Types ===");
console.log("Варіант:", VARIANT);

// Демонстрація фільтрації
console.log("\n--- Фільтрація задач зі статусом 'todo': ---");
const todoTasks = filterTasks(tasks, "status", "todo");
console.log(todoTasks.map(t => `[#${t.id}] ${t.title}`).join(", "));

console.log("\n--- Фільтрація за пріоритетом 'medium': ---");
const mediumTasks = filterTasks(tasks, "priority", "medium");
console.log(mediumTasks.map(t => `[#${t.id}] ${t.title}`).join(", "));

console.log("\n--- Приклад Success Response: ---");
const success = createSuccessResponse(tasks[0]);
console.log(success);

console.log("\n--- Приклад Error Response: ---");
const error = createErrorResponse("Task not found");
console.log(error);

const newTask: CreateTaskDto = {
  title: "Нова задача",
  description: "Опис",
  status: "todo",
  priority: "low",
  assignee: null,
  dueDate: null
};

const updateData: UpdateTaskDto = {
  status: "done"
};

console.log("\nDTO готові до використання");