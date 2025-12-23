import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { TodoItemContext } from "./TodoList";

const TodoItem = () => {
  const { deleteTodo } = useContext(TodoContext);
  const todo = useContext(TodoItemContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 10,
      }}
    >
      <span>{todo.title}</span>
      <button onClick={() => deleteTodo(todo.id)} style={{ padding: "8px 10px" }}>
        Delete
      </button>
    </div>
  );
};

export default TodoItem;
