import Component3 from "./Component3";

export default function Component2(props) {
  // Does not use any props, only passes them to its child
  return (
    <div style={{ padding: 12 }}>
      <h2>Component2</h2>
      <h4>Does not use any props (only forwards them)</h4>

      <Component3 {...props} />
    </div>
  );
}
