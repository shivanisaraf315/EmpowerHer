import { createContext, useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import TodoItem from "./TodoItem";

export const TodoItemContext = createContext(null);

const TodoList = () => {
  const { todos } = useContext(TodoContext);

  if (!todos.length) return <p style={{ opacity: 0.7 }}>No todos yet.</p>;

  return (
    <div style={{ display: "grid", gap: 10 }}>
      {todos.map((todo) => (
        <TodoItemContext.Provider key={todo.id} value={todo}>
          <TodoItem />
        </TodoItemContext.Provider>
      ))}
    </div>
  );
};

export default TodoList;
