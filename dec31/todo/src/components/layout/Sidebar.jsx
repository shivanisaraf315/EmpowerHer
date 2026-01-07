import TodoListItem from "../todos/TodoListItem";

export default function Sidebar({ todos, selectedId, onSelect, loading }) {
  if (loading) {
    return <div className="p-4 text-sm text-muted-foreground">Loading...</div>;
  }

  if (!todos.length) {
    return <div className="p-4 text-sm text-muted-foreground">No todos yet.</div>;
  }

  return (
    <div className="max-h-[calc(100vh-170px)] overflow-auto">
      {todos.map((t) => (
        <TodoListItem
          key={t.id}
          todo={t}
          active={t.id === selectedId}
          onClick={() => onSelect(t.id)}
        />
      ))}
    </div>
  );
}
