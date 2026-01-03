import React, { useState } from "react";
import { DEFAULT_IMAGE } from "../utils/storage.js";

const TYPES = [
  "Rajasthani",
  "Gujarati",
  "Mughlai",
  "Jain",
  "Thai",
  "North Indian",
  "South Indian",
];

export default function AdminSidebarForm({ onAdd }) {
  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("Rajasthani");
  const [parkingLot, setParkingLot] = useState("true");
  const [image, setImage] = useState(DEFAULT_IMAGE);

  const clearForm = () => {
    setRestaurantName("");
    setAddress("");
    setType("Rajasthani");
    setParkingLot("true");
    setImage(DEFAULT_IMAGE);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!restaurantName.trim() || !address.trim() || !type.trim() || !image.trim()) {
      alert("Please fill all fields. Empty form cannot be submitted.");
      return;
    }

    onAdd({
      restaurantName: restaurantName.trim(),
      address: address.trim(),
      type,
      parkingLot: parkingLot === "true",
      image: image.trim(),
      _clearForm: clearForm, // used by parent to clear after successful add
    });
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <h2 className="h1">Admin Controls</h2>
        <p className="sub">Add restaurants to localStorage (key: evalData).</p>
      </div>

      <div className="cardBody">
        <form onSubmit={handleSubmit}>
          <label className="label">Restaurant Name</label>
          <input
            className="input"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            placeholder="Eg: Spice Garden"
          />

          <label className="label">Address</label>
          <input
            className="input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="City, area, state"
          />

          <div className="row">
            <div>
              <label className="label">Type</label>
              <select className="select" value={type} onChange={(e) => setType(e.target.value)}>
                {TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Parking Lot</label>
              <select
                className="select"
                value={parkingLot}
                onChange={(e) => setParkingLot(e.target.value)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </div>
          </div>

          <label className="label">Image URL (pre-filled)</label>
          <input className="input" value={image} onChange={(e) => setImage(e.target.value)} />

          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button className="btn btnPrimary" type="submit" style={{ flex: 1 }}>
              Add Restaurant
            </button>
            <button
              className="btn"
              type="button"
              onClick={clearForm}
              title="Clear form"
            >
              Clear
            </button>
          </div>

          <p className="small" style={{ marginTop: 10 }}>
            restaurantID is auto-generated on add.
          </p>
        </form>
      </div>
    </div>
  );
}
