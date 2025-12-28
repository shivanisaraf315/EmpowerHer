import { useState, useMemo, useCallback, useRef } from "react";
import ProductList from "./components/ProductList";

// Simulating a large products array
const productsData = Array.from({ length: 5000 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: (i % 100) + 1,
}));

export default function App() {
  const [count, setCount] = useState(0);
  const [products] = useState(productsData);

  // 🔹 useMemo: total price recalculates ONLY when products change
  const totalPrice = useMemo(() => {
    console.log("✅ Calculating total price...");
    return products.reduce((sum, item) => sum + item.price, 0);
  }, [products]);

  // 🔹 useCallback: stable function reference
  const handleSelectProduct = useCallback((product) => {
    console.log("Selected product:", product.name);
  }, []);

  // 🔹 Prove handler reference does NOT change
  const prevHandler = useRef(handleSelectProduct);
  if (prevHandler.current !== handleSelectProduct) {
    console.log("❌ Handler reference changed");
    prevHandler.current = handleSelectProduct;
  } else {
    console.log("✅ Handler reference is stable");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>React Performance Optimization</h2>

      <button onClick={() => setCount((c) => c + 1)}>
        Counter: {count}
      </button>

      <h3>Total Price: ₹ {totalPrice}</h3>

      <ProductList
        products={products}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
