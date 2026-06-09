export {};

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

// --- 3.1 ---
class TaskManager {
  #tasks: Task[] = [];
  #nextId: number = 1;

  constructor(initialTasks: Task[] = []) {
    // Якщо передані початкові задачі, додаємо їх через метод
    initialTasks.forEach(t => this.addTask(t));
  }

  addTask(dto: Omit<Task, "id" | "createdAt">): Task {
    const newTask: Task = {
      ...dto,
      id: this.#nextId++,
      createdAt: new Date(),
    };
    this.#tasks.push(newTask);
    return newTask;
  }

  updateTask(id: number, updates: Partial<Omit<Task, "id" | "createdAt">>): Task | null {
    const index = this.#tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    // Створюємо оновлений об'єкт
    this.#tasks[index] = { ...this.#tasks[index], ...updates };
    return this.#tasks[index];
  }

  // Видалення
  deleteTask(id: number): boolean {
    const initialLength = this.#tasks.length;
    this.#tasks = this.#tasks.filter(t => t.id !== id);
    return this.#tasks.length < initialLength;
  }

  // Геттер
  get tasks(): Task[] {
    return [...this.#tasks];
  }

  // Геттер кількості
  get count(): number {
    return this.#tasks.length;
  }

  getById(id: number): Task | undefined {
    return this.#tasks.find(t => t.id === id);
  }
}

class FilteredTaskManager extends TaskManager {
  
  getByStatus(status: Status): Task[] {
    return this.tasks.filter(t => t.status === status);
  }

  getByPriority(priority: Priority): Task[] {
    return this.tasks.filter(t => t.priority === priority);
  }

  getByAssignee(assignee: string): Task[] {
    return this.tasks.filter(t => t.assignee === assignee);
  }

  getOverdue(): Task[] {
    const now = new Date();
    return this.tasks.filter(t => 
      t.dueDate && 
      t.dueDate < now && 
      t.status !== "done" && 
      t.status !== "cancelled"
    );
  }
}

console.log("=== Завдання 3: Класи та модифікатори доступу ===");

const manager = new FilteredTaskManager();

const task1 = manager.addTask({
  title: "Розробити API",
  description: "REST API для задач",
  status: "in_progress",
  priority: "high",
  assignee: "ДСС",
  dueDate: new Date("2026-02-01"), //протерміновано
});

manager.addTask({
  title: "Верстка",
  description: "Головна сторінка",
  status: "todo",
  priority: "medium",
  assignee: "Марія",
  dueDate: new Date("2026-05-20"),
});

manager.addTask({
  title: "Тестування",
  description: "Unit тести",
  status: "todo",
  priority: "low",
  assignee: "Іван",
  dueDate: null,
});

const taskToUpdate = manager.addTask({
  title: "Застаріла задача",
  description: "Буде видалена",
  status: "cancelled",
  priority: "low",
  assignee: null,
  dueDate: null,
});

console.log("Додано задач. Поточна кількість:", manager.count);

console.log("\n--- Оновлення задачі #1 ---");
manager.updateTask(task1.id, { status: "done", priority: "critical" });
console.log("Оновлена задача:", manager.getById(task1.id));

console.log("\n--- Задачі Івана: ---");
console.table(manager.getByAssignee("Іван"));

console.log("\n--- Задачі з пріоритетом 'medium': ---");
console.table(manager.getByPriority("medium"));

console.log("\n--- Протерміновані задачі: ---");
console.table(manager.getOverdue());

console.log("\n--- Видалення задачі ---");
const deleted = manager.deleteTask(taskToUpdate.id);
console.log(`Задача #${taskToUpdate.id} видалена:`, deleted);
console.log("Фінальна кількість задач:", manager.count);