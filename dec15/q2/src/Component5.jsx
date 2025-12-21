import Component6 from "./Component6";

export default function Component5({ e, f }) {
  // Receives: f (displays it), passes e forward
  return (
    <div style={{ padding: 12 }}>
      <h2>Component5</h2>
      <h4>This is prop f: {f}</h4>

      <Component6 e={e} />
    </div>
  );
}
