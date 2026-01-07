import { Button } from "@/components/ui/button";
import UpdateTodoModal from "./UpdateTodoModal";

export default function TodoDetails({ todo, onDelete, onToggle, onUpdateTitle }) {
  if (!todo) {
    return (
      <div className="rounded-xl border bg-white p-6">
        <div className="text-sm text-muted-foreground">
          Select a todo from the sidebar to view details.
        </div>
      </div>
    );
  }

  async function toggle() {
    try {
      await onToggle(todo.id, !todo.completed);
    } catch (err) {
      alert(err?.message || "Failed to toggle");
    }
  }

  async function remove() {
    if (!confirm("Delete this todo?")) return;
    try {
      await onDelete(todo.id);
    } catch (err) {
      alert(err?.message || "Failed to delete");
    }
  }

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-semibold">{todo.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Status: {todo.completed ? "Completed" : "Pending"}
          </p>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={toggle}>
            Toggle
          </Button>

          <UpdateTodoModal
            todo={todo}
            onSave={(title) => onUpdateTitle(todo.id, title)}
          />

          <Button variant="destructive" onClick={remove}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
