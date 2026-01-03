import React, { useEffect, useRef } from "react";

const TYPE_OPTIONS = [
  "All",
  "Rajasthani",
  "Gujarati",
  "Mughlai",
  "Jain",
  "Thai",
  "North Indian",
  "South Indian",
];

export default function NavbarControls({
  roleLabel,
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  parkingFilter,
  setParkingFilter,
  onLogout,
}) {
  const searchRef = useRef(null);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  return (
    <div className="navbar">
      <div className="navLeft">
        <span className="badge">{roleLabel}</span>

        <select
          className="select"
          style={{ width: 180 }}
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          {TYPE_OPTIONS.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>

        <select
          className="select"
          style={{ width: 170 }}
          value={parkingFilter}
          onChange={(e) => setParkingFilter(e.target.value)}
        >
          <option value="All">Parking: All</option>
          <option value="Yes">Parking: Yes</option>
          <option value="No">Parking: No</option>
        </select>

        <input
          ref={searchRef}
          className="input"
          style={{ width: 320 }}
          placeholder="Search by name or address..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <button className="btn" onClick={onLogout}>
        Logout
      </button>
    </div>
  );
}
