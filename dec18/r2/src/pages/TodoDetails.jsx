import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

export default function TodoDetails() {
  const { todoId } = useParams();

  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTodo() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setTodo(data);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch todo details");
      } finally {
        setLoading(false);
      }
    }

    loadTodo();
    return () => controller.abort();
  }, [todoId]);

  return (
    <div className="card">
      <h2>Todo Details (Protected + Dynamic)</h2>

      <p className="muted">
        Fetching from:{" "}
        <span className="mono">{`https://jsonplaceholder.typicode.com/todos/${todoId}`}</span>
      </p>

      <Link className="btn secondary" to="/todos">
        Back to Todos
      </Link>

      <div style={{ marginTop: 14 }}>
        {loading && <p className="muted">Loading...</p>}
        {error && <p className="error">{error}</p>}

        {!loading && !error && todo && (
          <div className="details">
            <p>
              <b>Todo ID:</b> {todo.id}
            </p>
            <p>
              <b>Title:</b> {todo.title}
            </p>
            <p>
              <b>Status:</b> {todo.completed ? "Completed" : "Not Completed"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
