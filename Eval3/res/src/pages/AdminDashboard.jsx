import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavbarControls from "../components/NavbarControls.jsx";
import AdminSidebarForm from "../components/AdminSidebarForm.jsx";
import RestaurantGrid from "../components/RestaurantGrid.jsx";
import { generateRestaurantID, getRestaurants, setRestaurants } from "../utils/storage.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const [restaurants, setRestaurantsState] = useState([]);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [parkingFilter, setParkingFilter] = useState("All");

  // Always render from localStorage
  const syncFromStorage = () => {
    setRestaurantsState(getRestaurants());
  };

  useEffect(() => {
    syncFromStorage();
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

  const handleAdd = (payload) => {
    const list = getRestaurants();
    const newObj = {
      restaurantID: generateRestaurantID(list),
      restaurantName: payload.restaurantName,
      address: payload.address,
      type: payload.type,
      parkingLot: payload.parkingLot,
      image: payload.image,
    };

    const next = [newObj, ...list];
    setRestaurants(next);
    syncFromStorage();

    payload._clearForm?.();
    alert("Restaurant added successfully.");
  };

  const handleDelete = (r) => {
    const ok = confirm("Are you sure you want to delete?");
    if (!ok) return;

    const list = getRestaurants();
    const next = list.filter((x) => x.restaurantID !== r.restaurantID);
    setRestaurants(next);
    syncFromStorage();

    alert("Restaurant deleted successfully.");
  };

  const handleUpdateNav = (r) => {
    navigate("/admin/restaurants/update", {
      state: { restaurantID: r.restaurantID },
    });
  };

  const doLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="container">
      <NavbarControls
        roleLabel={`Admin: ${user?.email ?? ""}`}
        search={search}
        setSearch={setSearch}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        parkingFilter={parkingFilter}
        setParkingFilter={setParkingFilter}
        onLogout={doLogout}
      />

      <div className="shell">
        <AdminSidebarForm onAdd={handleAdd} />

        <div className="card">
          <div className="cardHeader">
            <h2 className="h1">Restaurants</h2>
            <p className="sub">Showing {filtered.length} result(s).</p>
          </div>
          <div className="cardBody">
            <RestaurantGrid
              items={filtered}
              isAdmin={true}
              onUpdateClick={handleUpdateNav}
              onDeleteClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
