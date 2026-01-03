import React from "react";
import RestaurantCard from "./RestaurantCard.jsx";
import EmptyState from "./EmptyState.jsx";

export default function RestaurantGrid({ items, isAdmin, onUpdateClick, onDeleteClick }) {
  if (!items.length) {
    return <EmptyState text="No restaurants match your search and filters." />;
  }

  return (
    <div className="grid">
      {items.map((r) => (
        <RestaurantCard
          key={r.restaurantID}
          data={r}
          isAdmin={isAdmin}
          onUpdate={() => onUpdateClick?.(r)}
          onDelete={() => onDeleteClick?.(r)}
        />
      ))}
    </div>
  );
}
