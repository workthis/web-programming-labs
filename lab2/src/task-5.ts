export {};

type Status = "todo" | "in_progress" | "done" | "cancelled";

interface Task {
  id: number;
  title: string;
  description: string;
  status: Status;
  priority: string;
  assignee: string | null;
  createdAt: Date;
  dueDate: Date | null;
}

type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T; loadedAt: Date };
type ErrorState = { status: "error"; message: string; code: number };

type FetchState<T> = LoadingState | SuccessState<T> | ErrorState;

//5.2. Type Guard
function isLoadingState(state: FetchState<unknown>): state is LoadingState {
  return state.status === "loading";
}

function isSuccessState<T>(state: FetchState<T>): state is SuccessState<T> {
  return state.status === "success";
}

function isErrorState(state: FetchState<unknown>): state is ErrorState {
  return state.status === "error";
}

function renderState<T>(state: FetchState<T>, renderData: (data: T) => string): string {
  if (isLoadingState(state)) {
    return " Завантаження...";
  }
  
  if (isSuccessState(state)) {
    const time = state.loadedAt.toLocaleTimeString();
    return `Завантажено о ${time}: ${renderData(state.data)}`;
  }
  
  if (isErrorState(state)) {
    return `Помилка ${state.code}: ${state.message}`;
  }

  return "Невідомий стан";
}

function processValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined) {
    return "(порожнє значення)";
  }

  if (typeof value === "string") {
    return `Рядок: '${value}' (${value.length} символів)`;
  }

  if (typeof value === "number") {
    const type = value % 2 === 0 ? "парне" : "непарне";
    return `Число: ${value} (${type})`;
  }

  if (typeof value === "boolean") {
    const label = value ? "так" : "ні";
    return `Булево: ${label}`;
  }

  return "Невідомий тип";
}

function getStatusLabel(status: Status): string {
  switch (status) {
    case "todo": return "Треба зробити";
    case "in_progress": return "У роботі";
    case "done": return "Виконано";
    case "cancelled": return "Скасовано";
    default: {
      const _never: never = status;
      return _never;
    }
  }
}

console.log("=== Завдання 5 ===");

const states: FetchState<Task[]>[] = [
  { status: "loading" },
  { 
    status: "success", 
    data: [{ title: "Тестова задача" } as Task], 
    loadedAt: new Date() 
  },
  { status: "error", message: "Сервер недоступний", code: 500 },
];

states.forEach((s) => {
  console.log(renderState(s, (tasks: Task[]) => `${tasks.length} задач`));
});

console.log("\nДемонстрація processValue:");
[ "TS", 10, false, null, undefined ].forEach(v => console.log(processValue(v)));