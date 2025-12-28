import { Route, Routes } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<TodoList />} />
      <Route path="/todo/:id" element={<TodoDetails />} />
    </Routes>
  );
}
