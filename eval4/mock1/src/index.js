import express from "express";
import productsRouter from "./routes/products.routes.js";
import ordersRouter from "./routes/orders.routes.js";
import analyticsRouter from "./routes/analytics.routes.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: true, message: "E-commerce Orders & Analytics API" });
});

app.use("/products", productsRouter);
app.use("/orders", ordersRouter);
app.use("/analytics", analyticsRouter);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
