import Component2 from "./Component2";

export default function Component1() {
  // Holds props: a, b, c, d, e, f
  const a = "value a";
  const b = "value b";
  const c = "value c";
  const d = "value d";
  const e = "value e";
  const f = "value f";

  return (
    <div style={{ padding: 12 }}>
      <h2>Component1</h2>
      <h4>This is prop a: {a}</h4>
      <h4>This is prop b: {b}</h4>
      <h4>This is prop c: {c}</h4>
      <h4>This is prop d: {d}</h4>
      <h4>This is prop e: {e}</h4>
      <h4>This is prop f: {f}</h4>

      <Component2 a={a} b={b} c={c} d={d} e={e} f={f} />
    </div>
  );
}
