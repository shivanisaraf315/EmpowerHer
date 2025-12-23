import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Todos() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadTodos() {
      try {
        setLoading(true);
        setError("");

        const res = await fetch("https://jsonplaceholder.typicode.com/todos", {
          signal: controller.signal,
        });

        if (!res.ok) throw new Error("Failed");

        const data = await res.json();
        setTodos(Array.isArray(data) ? data.slice(0, 10) : []);
      } catch (e) {
        if (e.name !== "AbortError") setError("Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    }

    loadTodos();
    return () => controller.abort();
  }, []);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login", { replace: true });
  };

  return (
    <div className="card">
      <div className="row">
        <h2>Todos (Protected)</h2>
        <button className="btn secondary" onClick={logout}>
          Logout
        </button>
      </div>

      <p className="muted">
        Fetching from: <span className="mono">https://jsonplaceholder.typicode.com/todos</span>
      </p>

      {loading && <p className="muted">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className="grid">
          {todos.map((t) => (
            <Link key={t.id} to={`/todos/${t.id}`} className="todo-card link-card">
              <h3 className="todo-title">{t.title}</h3>
              <p className={t.completed ? "status done" : "status pending"}>
                {t.completed ? "Completed" : "Not Completed"}
              </p>
              <p className="tiny muted">Click to view details</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
