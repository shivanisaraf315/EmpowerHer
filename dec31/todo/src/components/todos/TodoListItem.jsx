import { Badge } from "@/components/ui/badge";

export default function TodoListItem({ todo, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full text-left px-3 py-3 border-b hover:bg-muted/40 transition",
        active ? "bg-muted/50" : "bg-white",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-medium truncate">{todo.title}</div>
        <Badge variant={todo.completed ? "default" : "secondary"}>
          {todo.completed ? "Completed" : "Pending"}
        </Badge>
      </div>
      <div className="text-xs text-muted-foreground mt-1 truncate">
        {todo.updatedAt ? `Updated: ${new Date(todo.updatedAt).toLocaleString()}` : ""}
      </div>
    </button>
  );
}
