import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import Footer from "../components/layout/Footer";
import TodoDetails from "../components/todos/TodoDetails";
import TodoComposer from "../components/todos/TodoComposer";
import {
  listTodosService,
  createTodoService,
  deleteTodoService,
  toggleTodoService,
  updateTodoTitleService,
} from "../services/todo.service";

export default function Todos() {
  const { session, user } = useAuth();

  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [filter, setFilter] = useState("all"); // all | completed | pending
  const [loading, setLoading] = useState(true);

  const selectedTodo = useMemo(
    () => todos.find((t) => t.id === selectedId) || null,
    [todos, selectedId]
  );

  const filteredTodos = useMemo(() => {
    if (filter === "completed") return todos.filter((t) => t.completed);
    if (filter === "pending") return todos.filter((t) => !t.completed);
    return todos;
  }, [todos, filter]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await listTodosService({
          idToken: session.idToken,
          uid: user.uid,
        });
        setTodos(data);
        setSelectedId(data[0]?.id || null);
      } catch (err) {
        alert(err?.message || "Failed to load todos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [session.idToken, user.uid]);

  async function onCreate(title) {
    const created = await createTodoService({
      idToken: session.idToken,
      uid: user.uid,
      title,
    });
    setTodos((prev) => [created, ...prev]);
    setSelectedId(created.id);
  }

  async function onDelete(todoId) {
    await deleteTodoService({ idToken: session.idToken, todoId });
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
    setSelectedId((prev) => (prev === todoId ? null : prev));
  }

  async function onToggle(todoId, nextCompleted) {
    const updated = await toggleTodoService({
      idToken: session.idToken,
      todoId,
      completed: nextCompleted,
    });
    setTodos((prev) => prev.map((t) => (t.id === todoId ? updated : t)));
  }

  async function onUpdateTitle(todoId, title) {
    const updated = await updateTodoTitleService({
      idToken: session.idToken,
      todoId,
      title,
    });
    setTodos((prev) => prev.map((t) => (t.id === todoId ? updated : t)));
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar filter={filter} setFilter={setFilter} />

      <div className="flex-1 grid grid-cols-1 md:grid-cols-[320px_1fr]">
        <aside className="border-r bg-white">
          <div className="p-3 border-b">
            <TodoComposer onCreate={onCreate} />
          </div>

          <Sidebar
            todos={filteredTodos}
            selectedId={selectedId}
            onSelect={setSelectedId}
            loading={loading}
          />
        </aside>

        <main className="bg-muted/30 p-4">
          <TodoDetails
            todo={selectedTodo}
            onDelete={onDelete}
            onToggle={onToggle}
            onUpdateTitle={onUpdateTitle}
          />
        </main>
      </div>

      <Footer />
    </div>
  );
}
