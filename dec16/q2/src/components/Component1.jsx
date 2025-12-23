import { AppContext } from "../context/AppContext";
import Component2 from "./Component2";

const Component1 = () => {
  const a = "A";
  const b = "B";
  const c = "C";
  const d = "D";
  const e = "E";
  const f = "F";

  return (
    <AppContext.Provider value={{ a, b, c, d, e, f }}>
      <div style={{ padding: 16 }}>
        <h2>Component1</h2>
        <Component2 />
      </div>
    </AppContext.Provider>
  );
};

export default Component1;
