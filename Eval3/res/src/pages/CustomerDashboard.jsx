import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarControls from "../components/NavbarControls.jsx";
import RestaurantGrid from "../components/RestaurantGrid.jsx";
import { getRestaurants } from "../utils/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function CustomerDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [restaurants, setRestaurantsState] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [parkingFilter, setParkingFilter] = useState("All");

  useEffect(() => {
    // Customer sees updated data after refresh, and also loads from localStorage
    setRestaurantsState(getRestaurants());
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return restaurants.filter((r) => {
      const matchesSearch =
        !q ||
        r.restaurantName.toLowerCase().includes(q) ||
        r.address.toLowerCase().includes(q);

      const matchesType = typeFilter === "All" ? true : r.type === typeFilter;

      const matchesParking =
        parkingFilter === "All"
          ? true
          : parkingFilter === "Yes"
          ? r.parkingLot === true
          : r.parkingLot === false;

      return matchesSearch && matchesType && matchesParking;
    });
  }, [restaurants, search, typeFilter, parkingFilter]);

  const doLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <NavbarControls
        roleLabel={`Customer: ${user?.email ?? ""}`}
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        parkingFilter={parkingFilter}
        setParkingFilter={setParkingFilter}
        onLogout={doLogout}
      />

      <div className="card">
        <div className="cardHeader">
          <h2 className="h1">Restaurants</h2>
          <p className="sub">Showing {filtered.length} result(s).</p>
        </div>
        <div className="cardBody">
          <RestaurantGrid items={filtered} isAdmin={false} />
        </div>
      </div>
    </div>
  );
}
