import { Router } from "express";
import { readDB, writeDB, toNumber } from "../utils/db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const db = await readDB();
    res.status(200).json({ success: true, count: db.products.length, data: db.products });
  } catch {
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, price, stock } = req.body;

    const numericPrice = toNumber(price);
    const numericStock = toNumber(stock);

    if (!name || numericPrice === null || numericStock === null || numericPrice < 0 || numericStock < 0) {
      return res.status(400).json({ success: false, message: "Invalid product data" });
    }

    const db = await readDB();
    const nextId = db.products.length ? Math.max(...db.products.map(p => p.id)) + 1 : 1;

    const newProduct = { id: nextId, name: String(name), price: numericPrice, stock: numericStock };

    db.products.push(newProduct);
    await writeDB(db);

    res.status(201).json({ success: true, message: "Product created", data: newProduct });
  } catch {
    res.status(500).json({ success: false, message: "Failed to create product" });
  }
});

export default router;
