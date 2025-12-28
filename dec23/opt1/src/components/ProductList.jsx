export default function ProductList({ products, onSelectProduct }) {
  console.log("🔁 ProductList rendered");

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Products (first 20)</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
        {products.slice(0, 20).map((product) => (
          <div
            key={product.id}
            onClick={() => onSelectProduct(product)}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              cursor: "pointer",
            }}
          >
            <p>{product.name}</p>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
