import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Component5 from "./Component5";

const Component4 = () => {
  const { c, d } = useContext(AppContext);

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", marginTop: 12 }}>
      <h2>Component4</h2>
      <h4>This is prop c: {c}</h4>
      <h4>This is prop d: {d}</h4>
      <Component5 />
    </div>
  );
};

export default Component4;
