import TaskCard from "./components/TaskCard/TaskCard";
import type { Task } from "./types/task";

const mockTask: Task = {
  id: "1",
  title: "Тест",
  description: "Перевірка відображення",
  status: "todo",
  priority: "high",
  createdAt: new Date(),
};

function App() {
  return (
    <div style={{ padding: '20px', maxWidth: '400px' }}>
      <h1>Мій таскменеджер</h1>
      
      <TaskCard
        task={mockTask}
        onDelete={(id) => console.log("Видаленя з ID:", id)}
        onStatusChange={(id, status) => console.log(`Зміна статусу ${id} на: ${status}`)}
      />
    </div>
  );
}

export default App;