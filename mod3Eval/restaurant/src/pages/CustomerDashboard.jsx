import { useEffect, useState } from "react";
import { getData } from "../utils/storage";
import Navbar from "../components/Navbar";
import RestaurantCard from "../components/RestaurantCard";

export default function CustomerDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [parking, setParking] = useState("");

  useEffect(() => {
    setData(getData());
  }, []);

  const filtered = data.filter((r) => {
    return (
      (r.restaurantName.toLowerCase().includes(search.toLowerCase()) ||
        r.address.toLowerCase().includes(search.toLowerCase())) &&
      (!type || r.type === type) &&
      (!parking || String(r.parkingLot) === parking)
    );
  });

  return (
    <>
      <Navbar {...{ search, setSearch, type, setType, parking, setParking }} />
      <div className="cards">
        {filtered.map((r) => (
          <RestaurantCard key={r.restaurantID} data={r} />
        ))}
      </div>
    </>
  );
}
