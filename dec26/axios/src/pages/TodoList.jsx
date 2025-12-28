import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTodos } from "../api/todoService";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function fetchTodos() {
      try {
        setLoading(true);
        setError("");
        const data = await getTodos();
        // optional: keep it smaller
        const first50 = data.slice(0, 50);
        if (isMounted) setTodos(first50);
      } catch (e) {
        if (isMounted) setError("Failed to load todos");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchTodos();
    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) return <p className="page">Loading todos...</p>;
  if (error) return <p className="page error">{error}</p>;

  return (
    <div className="page">
      <h2>Todos</h2>

      <div className="list">
        {todos.map((t) => (
          <div key={t.id} className="todo-row">
            <div>
              <div className="title">
                <Link to={`/todo/${t.id}`}>{t.title}</Link>
              </div>
              <div className={t.completed ? "status done" : "status pending"}>
                {t.completed ? "Completed" : "Not Completed"}
              </div>
            </div>

            <Link className="btn" to={`/todo/${t.id}`}>
              View
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
