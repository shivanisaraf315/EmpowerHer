import { Suspense, lazy, useState } from "react";

// ✅ Lazy load the heavy component
const HeavySection = lazy(() => import("./components/HeavySection"));

export default function App() {
  const [count, setCount] = useState(0);
  const [showHeavy, setShowHeavy] = useState(false);

  return (
    <div style={{ maxWidth: 800, margin: "30px auto", padding: 16 }}>
      <h2>React.memo & Lazy Loading Demo</h2>

      <button onClick={() => setCount((c) => c + 1)} style={{ padding: "10px 14px" }}>
        Counter: {count}
      </button>

      <button
        onClick={() => setShowHeavy(true)}
        style={{ padding: "10px 14px", marginLeft: 10 }}
        disabled={showHeavy}
      >
        Load Heavy Component
      </button>

      <div style={{ marginTop: 18 }}>
        {showHeavy && (
          <Suspense fallback={<p>Loading Heavy Section...</p>}>
            <HeavySection />
          </Suspense>
        )}
      </div>
    </div>
  );
}
