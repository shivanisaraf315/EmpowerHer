import Component4 from "./Component4";

export default function Component3({ a, b, c, d, e, f }) {
  // Receives: a, b (displays them), passes remaining forward
  return (
    <div style={{ padding: 12 }}>
      <h2>Component3</h2>
      <h4>This is prop a: {a}</h4>
      <h4>This is prop b: {b}</h4>

      <Component4 c={c} d={d} e={e} f={f} />
    </div>
  );
}
