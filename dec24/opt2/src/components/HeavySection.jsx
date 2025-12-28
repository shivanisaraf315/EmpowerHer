import React from "react";

function HeavySection() {
  console.log("✅ HeavySection rendered");

  // Simulate heavy UI work
  const items = Array.from({ length: 2000 }, (_, i) => `Heavy Item ${i + 1}`);

  return (
    <div style={{ marginTop: 10, padding: 16, border: "1px solid #ddd", borderRadius: 12 }}>
      <h3>Heavy UI Section</h3>
      <p>This component is lazy loaded and wrapped with React.memo.</p>

      <div style={{ maxHeight: 220, overflow: "auto", border: "1px solid #eee", padding: 10 }}>
        {items.slice(0, 100).map((x) => (
          <div key={x}>{x}</div>
        ))}
      </div>
    </div>
  );
}

// ✅ React.memo prevents re-render when parent counter updates (no props changing)
export default React.memo(HeavySection);
