import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Component6 = () => {
  const { e } = useContext(AppContext);

  return (
    <div style={{ padding: 16, border: "1px solid #ddd", marginTop: 12 }}>
      <h2>Component6</h2>
      <h4>This is prop e: {e}</h4>
    </div>
  );
};

export default Component6;
