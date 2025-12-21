import Component1 from "./Component1";

export default function App() {
  return (
    <div style={{ maxWidth: 900, margin: "24px auto", fontFamily: "serif" }}>
      <h1>Props Drilling Demo</h1>
      <hr />
      <Component1 />
    </div>
  );
}
