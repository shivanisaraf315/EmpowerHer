import { Router } from "express";
import { readDB, writeDB, getTodayIST, toNumber } from "../utils/db.js";

const router = Router();

router.post("/", async (req, res) => {
  try {
    const productId = toNumber(req.body.productId);
    const quantity = toNumber(req.body.quantity);

    if (productId === null || quantity === null || quantity <= 0) {
      return res.status(400).json({ success: false, message: "Invalid productId or quantity" });
    }

    const db = await readDB();
    const product = db.products.find((p) => p.id === productId);

    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    if (product.stock === 0 || quantity > product.stock) {
      return res.status(400).json({ success: false, message: "Insufficient stock" });
    }

    const totalAmount = product.price * quantity;
    const nextOrderId = db.orders.length ? Math.max(...db.orders.map(o => o.id)) + 1 : 1;

    const newOrder = {
      id: nextOrderId,
      productId,
      quantity,
      totalAmount,
      status: "placed",
      createdAt: getTodayIST()
    };

    product.stock = product.stock - quantity;
    db.orders.push(newOrder);

    await writeDB(db);

    res.status(201).json({ success: true, message: "Order created", data: newOrder });
  } catch {
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

router.get("/", async (req, res) => {
  try {
    const db = await readDB();
    res.status(200).json({ success: true, count: db.orders.length, data: db.orders });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

router.delete("/:orderId", async (req, res) => {
  try {
    const orderId = toNumber(req.params.orderId);
    if (orderId === null) return res.status(400).json({ success: false, message: "Invalid orderId" });

    const db = await readDB();
    const order = db.orders.find((o) => o.id === orderId);

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Order already cancelled" });
    }

    const today = getTodayIST();
    if (order.createdAt !== today) {
      return res.status(400).json({ success: false, message: "Cancellation allowed only on the same day" });
    }

    const product = db.products.find((p) => p.id === order.productId);
    if (!product) return res.status(404).json({ success: false, message: "Product not found for this order" });

    product.stock = product.stock + order.quantity;
    order.status = "cancelled";

    await writeDB(db);

    res.status(200).json({ success: true, message: "Order cancelled", data: order });
  } catch {
    res.status(500).json({ success: false, message: "Failed to cancel order" });
  }
});

router.patch("/change-status/:orderId", async (req, res) => {
  try {
    const orderId = toNumber(req.params.orderId);
    const newStatus = req.body.status;

    if (orderId === null) return res.status(400).json({ success: false, message: "Invalid orderId" });
    if (!["shipped", "delivered"].includes(newStatus)) {
      return res.status(400).json({ success: false, message: "Invalid status" });
    }

    const db = await readDB();
    const order = db.orders.find((o) => o.id === orderId);

    if (!order) return res.status(404).json({ success: false, message: "Order not found" });

    if (order.status === "cancelled") {
      return res.status(400).json({ success: false, message: "Cannot update cancelled order" });
    }
    if (order.status === "delivered") {
      return res.status(400).json({ success: false, message: "Delivered orders cannot be updated" });
    }

    const validNext =
      (order.status === "placed" && newStatus === "shipped") ||
      (order.status === "shipped" && newStatus === "delivered");

    if (!validNext) {
      return res.status(400).json({ success: false, message: "Cannot skip status" });
    }

    order.status = newStatus;
    await writeDB(db);

    res.status(200).json({ success: true, message: "Order status updated", data: order });
  } catch {
    res.status(500).json({ success: false, message: "Failed to update status" });
  }
});

export default router;
