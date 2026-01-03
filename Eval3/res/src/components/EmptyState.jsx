import React from "react";

export default function EmptyState({ text }) {
  return (
    <div className="card">
      <div className="centerBox">{text}</div>
    </div>
  );
}
