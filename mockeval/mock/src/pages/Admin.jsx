import { useCallback, useState } from "react";
import Navbar from "../components/Navbar";
import SidebarForm from "../components/SidebarForm";
import FleetCard from "../components/FleetCard";

export default function Admin({ onLogout }) {
  const [fleets, setFleets] = useState([]);

  // ✅ useCallback handlers (stable references)
  const addFleet = useCallback((fleet) => {
    setFleets((prev) => [fleet, ...prev]);
  }, []);

  const updateDriver = useCallback((id) => {
    const nextName = prompt("Enter new driver name:");
    if (nextName === null) return;

    const clean = nextName.trim();
    if (!clean) {
      alert("Driver name cannot be empty");
      return;
    }

    setFleets((prev) =>
      prev.map((f) => (f.id === id ? { ...f, driverName: clean } : f))
    );
  }, []);

  const toggleAvailability = useCallback((id) => {
    setFleets((prev) =>
      prev.map((f) =>
        f.id === id
          ? { ...f, availability: f.availability === "Available" ? "Unavailable" : "Available" }
          : f
      )
    );
  }, []);

  const deleteVehicle = useCallback((id) => {
    const ok = confirm("Are you sure you want to delete this vehicle?");
    if (!ok) return;

    setFleets((prev) => prev.filter((f) => f.id !== id));
  }, []);

  return (
    <div className="admin">
      <Navbar onLogout={onLogout} />

      <div className="admin-body">
        <aside className="sidebar">
          <SidebarForm onAddFleet={addFleet} />
        </aside>

        <main className="content">
          <h2>Fleet Cards</h2>

          {fleets.length === 0 ? (
            <p className="muted">No fleets added yet.</p>
          ) : (
            <div className="grid">
              {fleets.map((fleet) => (
                <FleetCard
                  key={fleet.id}
                  fleet={fleet}
                  onUpdateDriver={updateDriver}
                  onToggleAvailability={toggleAvailability}
                  onDelete={deleteVehicle}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
