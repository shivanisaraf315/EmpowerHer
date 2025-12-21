import Component5 from "./Component5";

export default function Component4({ c, d, e, f }) {
  // Receives: c, d (displays them), passes remaining forward
  return (
    <div style={{ padding: 12 }}>
      <h2>Component4</h2>
      <h4>This is prop c: {c}</h4>
      <h4>This is prop d: {d}</h4>

      <Component5 e={e} f={f} />
    </div>
  );
}
