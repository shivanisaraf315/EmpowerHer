import { useEffect, useState } from "react";
import { getData, setData } from "../utils/storage";
import RestaurantCard from "../components/RestaurantCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const IMG =
  "https://coding-platform.s3.amazonaws.com/dev/lms/tickets/7524df6e-46fa-4506-8766-eca8da47c2f1/2izhqnTaNLdenHYF.jpeg";

export default function AdminDashboard() {
  const [data, setList] = useState([]);
  const [form, setForm] = useState({
    restaurantName: "",
    address: "",
    type: "",
    parkingLot: "",
    image: IMG,
  });

  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setList(getData());
  }, []);

  const addRestaurant = () => {
    if (!form.restaurantName || !form.address || !form.type || form.parkingLot === "") {
      alert("Fill all fields");
      return;
    }

    const newData = {
      ...form,
      restaurantID: Date.now(),
      parkingLot: form.parkingLot === "true",
    };

    const updated = [...data, newData];
    setData(updated);
    setList(updated);
    alert("Restaurant Added");

    setForm({
      restaurantName: "",
      address: "",
      type: "",
      parkingLot: "",
      image: IMG,
    });
  };

  const deleteItem = (id) => {
    if (!confirm("Are you sure you want to delete?")) return;
    const updated = data.filter((r) => r.restaurantID !== id);
    setData(updated);
    setList(updated);
    alert("Deleted successfully");
  };

  const filtered = data.filter((r) => {
    return (
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())) &&
      (!type || r.type === type) &&
      (!parking || String(r.parkingLot) === parking)
    );
  });

  return (
    <div className="admin">
      <Navbar {...{ search, setSearch, type, setType, parking, setParking }} />

      <div className="layout">
        <div className="sidebar">
          <input placeholder="Name" value={form.restaurantName}
            onChange={(e) => setForm({ ...form, restaurantName: e.target.value })} />
          <input placeholder="Address" value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })} />

          <select value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="">Select Type</option>
            <option>Rajasthani</option>
            <option>Gujarati</option>
            <option>Mughlai</option>
            <option>Jain</option>
            <option>Thai</option>
            <option>North Indian</option>
            <option>South Indian</option>
          </select>

          <select value={form.parkingLot}
            onChange={(e) => setForm({ ...form, parkingLot: e.target.value })}>
            <option value="">Parking?</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>

          <button onClick={addRestaurant}>Add Restaurant</button>
        </div>

        <div className="cards">
          {filtered.map((r) => (
            <RestaurantCard
              key={r.restaurantID}
              data={r}
              isAdmin
              onDelete={deleteItem}
              onUpdate={() => navigate("/admin/restaurants/update", { state: r })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
