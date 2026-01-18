const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();
const dbPath = path.join(__dirname, "..", "db.json");

function readDB() {
  const raw = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(raw || "{}");
}

function writeDB(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function generateId() {
  return Date.now().toString();
}

// POST /users/add
router.post("/add", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "name and email are required" });
  }

  const db = readDB();
  if (!db.users) db.users = [];

  const newUser = {
    id: generateId(),
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
  };

  db.users.push(newUser);
  writeDB(db);

  return res.status(201).json({ message: "User created", user: newUser });
});

// GET /users
router.get("/", (req, res) => {
  const db = readDB();
  return res.status(200).json(db.users || []);
});

// GET /users/:userId
router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  const db = readDB();

  const user = (db.users || []).find((u) => String(u.id) === String(userId));
  if (!user) return res.status(404).json({ error: "User not found" });

  return res.status(200).json(user);
});

// PUT /users/update/:userId
router.put("/update/:userId", (req, res) => {
  const { userId } = req.params;
  const { name, email } = req.body;

  const db = readDB();
  const users = db.users || [];

  const index = users.findIndex((u) => String(u.id) === String(userId));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  if (name !== undefined) users[index].name = String(name).trim();
  if (email !== undefined) users[index].email = String(email).trim().toLowerCase();

  db.users = users;
  writeDB(db);

  return res.status(200).json({ message: "User updated", user: users[index] });
});

// DELETE /users/delete/:userId
router.delete("/delete/:userId", (req, res) => {
  const { userId } = req.params;

  const db = readDB();
  const users = db.users || [];

  const index = users.findIndex((u) => String(u.id) === String(userId));
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const deleted = users.splice(index, 1)[0];

  db.users = users;
  writeDB(db);

  return res.status(200).json({ message: "User deleted", user: deleted });
});

module.exports = router;
