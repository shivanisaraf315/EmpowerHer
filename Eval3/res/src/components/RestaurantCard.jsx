import React from "react";

export default function RestaurantCard({ data, isAdmin, onUpdate, onDelete }) {
  const { restaurantName, address, type, parkingLot, image } = data;

  return (
    <div className="card rCard">
      <img className="rImg" src={image} alt={restaurantName} />
      <div className="rMeta">
        <h3 className="rTitle">{restaurantName}</h3>
        <p className="rAddr">{address}</p>

        <div className="pillRow">
          <span className="pill">{type}</span>
          {parkingLot ? (
            <span className="pill pillYes">Parking: Available</span>
          ) : (
            <span className="pill pillNo">Parking: Not available</span>
          )}
        </div>
      </div>

      {isAdmin && (
        <div className="cardActions">
          <button className="btn btnSuccess" onClick={onUpdate}>
            Update
          </button>
          <button className="btn btnDanger" onClick={onDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
