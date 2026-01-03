import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getRestaurants, setRestaurants } from "../utils/storage.js";

const TYPES = [
  "Rajasthani",
  "Gujarati",
  "Mughlai",
  "Jain",
  "Thai",
  "North Indian",
  "South Indian",
];

export default function UpdateRestaurant() {
  const navigate = useNavigate();
  const location = useLocation();

  const restaurantID = location.state?.restaurantID;

  const [list, setList] = useState([]);
  const current = useMemo(() => {
    return list.find((x) => x.restaurantID === restaurantID);
  }, [list, restaurantID]);

  const [restaurantName, setRestaurantName] = useState("");
  const [address, setAddress] = useState("");
  const [type, setType] = useState("Rajasthani");
  const [parkingLot, setParkingLot] = useState("true");
  const [image, setImage] = useState("");

  useEffect(() => {
    const data = getRestaurants();
    setList(data);
  }, []);

  useEffect(() => {
    if (!restaurantID) return;

    const data = getRestaurants();
    const found = data.find((x) => x.restaurantID === restaurantID);
    if (!found) return;

    setRestaurantName(found.restaurantName);
    setAddress(found.address);
    setType(found.type);
    setParkingLot(String(found.parkingLot));
    setImage(found.image);
  }, [restaurantID]);

  useEffect(() => {
    // If user directly opens update page without selecting a restaurant
    if (restaurantID == null) {
      navigate("/admin/dashboard", { replace: true });
    }
  }, [restaurantID, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();

    if (!restaurantName.trim() || !address.trim() || !type.trim() || !image.trim()) {
      alert("Please fill all fields. Empty form cannot be submitted.");
      return;
    }

    const ok = confirm("Are you sure you want to update?");
    if (!ok) return;

    const data = getRestaurants();
    const next = data.map((x) => {
      if (x.restaurantID !== restaurantID) return x;
      return {
        ...x,
        restaurantName: restaurantName.trim(),
        address: address.trim(),
        type,
        parkingLot: parkingLot === "true",
        image: image.trim(),
      };
    });

    setRestaurants(next);
    alert("Restaurant updated successfully.");
    navigate("/admin/dashboard", { replace: true });
  };

  if (!current) {
    return (
      <div className="container" style={{ maxWidth: 720 }}>
        <div className="card">
          <div className="cardHeader">
            <h2 className="h1">Update Restaurant</h2>
            <p className="sub">Loading restaurant data...</p>
          </div>
          <div className="cardBody">
            <div className="centerBox">If this keeps showing, go back and click Update again.</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: 720 }}>
      <div className="card">
        <div className="cardHeader">
          <h2 className="h1">Update Restaurant</h2>
          <p className="sub">Editing ID: {restaurantID}</p>
        </div>

        <div className="cardBody">
          <form onSubmit={handleUpdate}>
            <label className="label">Restaurant Name</label>
            <input
              className="input"
              value={restaurantName}
              onChange={(e) => setRestaurantName(e.target.value)}
            />

            <label className="label">Address</label>
            <input
              className="input"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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

            <label className="label">Image URL</label>
            <input className="input" value={image} onChange={(e) => setImage(e.target.value)} />

            <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
              <button className="btn btnPrimary" type="submit" style={{ flex: 1 }}>
                Update
              </button>
              <button className="btn" type="button" onClick={() => navigate("/admin/dashboard")}>
                Cancel
              </button>
            </div>
          </form>

          <p className="small" style={{ marginTop: 12 }}>
            Data updates are written to localStorage key: <b>evalData</b>.
          </p>
        </div>
      </div>
    </div>
  );
}
