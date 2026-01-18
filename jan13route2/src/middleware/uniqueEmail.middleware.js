const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "db.json");

function readDB() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
}

function uniqueEmailMiddleware(req, res, next) {
  const email = (req.body.email || "").trim().toLowerCase();

  if (!email) return res.status(400).json({ error: "Email is required" });

  const db = readDB();
  const users = db.users || [];

  const exists = users.some((u) => String(u.email).toLowerCase() === email);
  if (exists) return res.status(409).json({ error: "Email already exists" });

  req.body.email = email;
  next();
}

module.exports = uniqueEmailMiddleware;
