import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function Navbar({ filter, setFilter }) {
  const { isAuthenticated, logout } = useAuth();
  const nav = useNavigate();

  function onSignOut() {
    logout();
    nav("/login", { replace: true });
  }

  return (
    <header className="border-b bg-white">
      <div className="px-4 py-3 flex items-center justify-between gap-3">
        <div className="font-semibold text-lg">Todos</div>

        <div className="flex items-center gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            All Todos
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Completed Todos
          </Button>
          <Button
            variant={filter === "pending" ? "default" : "outline"}
            onClick={() => setFilter("pending")}
          >
            Pending Todos
          </Button>

          <Separator orientation="vertical" className="h-7 mx-2" />

          {isAuthenticated ? (
            <Button variant="destructive" onClick={onSignOut}>
              Sign Out
            </Button>
          ) : (
            <Button onClick={() => nav("/login")}>Sign In</Button>
          )}
        </div>
      </div>
    </header>
  );
}
