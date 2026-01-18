import { Router } from "express";
import { readDB, toNumber } from "../utils/db.js";

const router = Router();

const getProductById = (products, productId) => {
  const match = products.filter((p) => p.id === productId);
  return match.length ? match[0] : null;
};

router.get("/allorders", async (req, res) => {
  try {
    const db = await readDB();

    const ordersList = [];
    db.orders.forEach((o) => ordersList.push(o));

    res.status(200).json({ success: true, totalCount: ordersList.length, data: ordersList });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
});

router.get("/cancelled-orders", async (req, res) => {
  try {
    const db = await readDB();
    const cancelled = db.orders.filter((o) => o.status === "cancelled");

    res.status(200).json({ success: true, totalCount: cancelled.length, data: cancelled });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
});

router.get("/shipped", async (req, res) => {
  try {
    const db = await readDB();
    const shipped = db.orders.filter((o) => o.status === "shipped");

    res.status(200).json({ success: true, totalCount: shipped.length, data: shipped });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
});

router.get("/total-revenue/:productId", async (req, res) => {
  try {
    const productId = toNumber(req.params.productId);
    if (productId === null) return res.status(400).json({ success: false, message: "Invalid productId" });

    const db = await readDB();
    const product = getProductById(db.products, productId);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const validOrders = db.orders
      .filter((o) => o.productId === productId)
      .filter((o) => o.status !== "cancelled");

    const totalRevenue = validOrders.reduce((sum, o) => sum + o.quantity * product.price, 0);

    res.status(200).json({ success: true, productId, productName: product.name, totalRevenue });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
});

router.get("/alltotalrevenue", async (req, res) => {
  try {
    const db = await readDB();
    const validOrders = db.orders.filter((o) => o.status !== "cancelled");

    const totalRevenue = validOrders.reduce((sum, o) => {
      const product = getProductById(db.products, o.productId);
      const price = product ? product.price : 0;
      return sum + o.quantity * price;
    }, 0);

    res.status(200).json({ success: true, totalRevenue });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
});

export default router;
