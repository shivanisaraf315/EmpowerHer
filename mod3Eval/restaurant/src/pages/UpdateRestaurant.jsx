import { useLocation, useNavigate } from "react-router-dom";
import { getData, setData } from "../utils/storage";
import { useState } from "react";

export default function UpdateRestaurant() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(state);

  const update = () => {
    if (!confirm("Are you sure you want to update?")) return;

    const data = getData().map((r) =>
      r.restaurantID === form.restaurantID ? form : r
    );
    setData(data);
    alert("Updated successfully");
    navigate("/admin/dashboard");
  };

  return (
    <div className="login">
      <input value={form.restaurantName} onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
      <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
      <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
        <option>Rajasthani</option>
        <option>Gujarati</option>
        <option>Mughlai</option>
        <option>Jain</option>
        <option>Thai</option>
        <option>North Indian</option>
        <option>South Indian</option>
      </select>
      <select value={String(form.parkingLot)} onChange={(e) => setForm({ ...form, parkingLot: e.target.value === "true" })}>
        <option value="true">Parking</option>
        <option value="false">No Parking</option>
      </select>
      <button onClick={update}>Update</button>
    </div>
  );
}
