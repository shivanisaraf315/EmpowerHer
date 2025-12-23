import { useMemo, useState } from "react";
import { TodoContext } from "../context/TodoContext";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

const Todos = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (title) => {
    const cleanTitle = String(title || "").trim();
    if (!cleanTitle) return;

    const newTodo = {
      id: typeof crypto !== "undefined" && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()),
      title: cleanTitle,
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const value = useMemo(() => ({ todos, addTodo, deleteTodo }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      <div style={{ maxWidth: 520, margin: "40px auto", padding: 16 }}>
        <h2>Todo App (Context API)</h2>
        <AddTodo />
        <TodoList />
      </div>
    </TodoContext.Provider>
  );
};

export default Todos;
