import { useState } from "react";

const categories = ["Auto", "Car", "Truck", "Bus"];
const statuses = ["Available", "Unavailable"];

export default function SidebarForm({ onAddFleet }) {
  const [vehicleReg, setVehicleReg] = useState("");
  const [category, setCategory] = useState("Car");
  const [driverName, setDriverName] = useState("");
  const [availability, setAvailability] = useState("Available");

  const reset = () => {
    setVehicleReg("");
    setCategory("Car");
    setDriverName("");
    setAvailability("Available");
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const reg = vehicleReg.trim();
    const driver = driverName.trim();

    if (!reg || !driver) {
      alert("All required fields must be filled");
      return;
    }

    const newFleet = {
      id: Date.now(),
      vehicleReg: reg,
      category,
      driverName: driver,
      availability,
    };

    onAddFleet(newFleet);
    reset();
  };

  return (
    <div className="card">
      <h3>Add Fleet</h3>

      <form onSubmit={onSubmit} className="form">
        <label className="label">
          Vehicle Registration Number*
          <input
            className="input"
            value={vehicleReg}
            onChange={(e) => setVehicleReg(e.target.value)}
            placeholder="AP09AB1234"
          />
        </label>

        <label className="label">
          Category
          <select className="input" value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="label">
          Driver Name*
          <input
            className="input"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            placeholder="Driver Name"
          />
        </label>

        <label className="label">
          Availability Status
          <select
            className="input"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <button className="btn" type="submit">
          Add Fleet
        </button>
      </form>

      <p className="muted tiny">Fields with * are required.</p>
    </div>
  );
}
