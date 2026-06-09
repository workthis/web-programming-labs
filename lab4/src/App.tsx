import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import Layout from "./components/Layout/Layout";

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Перенаправлення з головної*/}
          <Route index element={<Navigate to="/tasks" replace />} />
          
          {/* Оголошення маршрутів */}
          <Route path="tasks" element={/* <TasksPage /> */ null} />
          <Route path="tasks/new" element={/* <NewTaskPage /> */ null} />
          <Route path="tasks/:id" element={/* <TaskDetailPage /> */ null} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}