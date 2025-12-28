import React from "react";

function FleetCard({ fleet, onUpdateDriver, onToggleAvailability, onDelete }) {
  console.log("FleetCard render:", fleet.id);

  const imgUrl = "https://via.placeholder.com/320x160.png?text=Vehicle";

  return (
    <div className="fleet-card">
      <img className="fleet-img" src={imgUrl} alt="vehicle" />

      <div className="fleet-info">
        <div><b>Reg No:</b> {fleet.vehicleReg}</div>
        <div><b>Category:</b> {fleet.category}</div>
        <div><b>Driver:</b> {fleet.driverName}</div>
        <div>
          <b>Status:</b>{" "}
          <span className={fleet.availability === "Available" ? "tag ok" : "tag bad"}>
            {fleet.availability}
          </span>
        </div>
      </div>

      <div className="actions">
        <button className="btn secondary" onClick={() => onUpdateDriver(fleet.id)}>
          Update Driver
        </button>

        <button className="btn secondary" onClick={() => onToggleAvailability(fleet.id)}>
          Change Availability
        </button>

        <button className="btn danger" onClick={() => onDelete(fleet.id)}>
          Delete Vehicle
        </button>
      </div>
    </div>
  );
}

export default React.memo(FleetCard);
