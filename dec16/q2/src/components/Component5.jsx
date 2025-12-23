import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Component6 from "./Component6";

const Component5 = () => {
  const { f } = useContext(AppContext);

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", marginTop: 12 }}>
      <h2>Component5</h2>
      <h4>This is prop f: {f}</h4>
      <Component6 />
    </div>
  );
};

export default Component5;
