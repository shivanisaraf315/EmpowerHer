import { useEffect, useState } from "react";
import TodoCard from "./TodoCard";

export default function TodosList() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then(res => res.json())
      .then(data => setTodos(data.slice(0, 15)));

    return () => {
      alert("cleanup worked");
    };
  }, []);

  return (
    <div>
      {todos.map(todo => (
        <TodoCard
          key={todo.id}
          userId={todo.userId}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </div>
  );
}
