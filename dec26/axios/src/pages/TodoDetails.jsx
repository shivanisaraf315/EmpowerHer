import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getTodoById } from "../api/todoService";

export default function TodoDetails() {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTodo() {
      try {
        setLoading(true);
        setError("");
        const data = await getTodoById(id);
        if (isMounted) setTodo(data);
      } catch (e) {
        if (isMounted) setError("Failed to load todo details");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTodo();
    return () => {
      isMounted = false;
    };
  }, [id]);

  if (loading) return <p className="page">Loading todo details...</p>;
  if (error) return <p className="page error">{error}</p>;
  if (!todo) return <p className="page">Todo not found</p>;

  return (
    <div className="page">
      <h2>Todo Details</h2>

      <div className="card">
        <p>
          <b>ID:</b> {todo.id}
        </p>
        <p>
          <b>Title:</b> {todo.title}
        </p>
        <p>
          <b>Status:</b>{" "}
          <span className={todo.completed ? "status done" : "status pending"}>
            {todo.completed ? "Completed" : "Not Completed"}
          </span>
        </p>
      </div>

      <Link className="btn" to="/">
        Back to List
      </Link>
    </div>
  );
}
