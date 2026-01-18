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

// POST /todos/add
router.post("/add", (req, res) => {
  const { title, userId } = req.body;

  if (!title) {
    return res.status(400).json({ error: "title is required" });
  }

  const db = readDB();
  if (!db.todos) db.todos = [];

  const newTodo = {
    id: generateId(),
    title: String(title).trim(),
    userId: userId ? String(userId) : null,
    completed: false,
  };

  db.todos.push(newTodo);
  writeDB(db);

  return res.status(201).json({ message: "Todo created", todo: newTodo });
});

// GET /todos
router.get("/", (req, res) => {
  const db = readDB();
  return res.status(200).json(db.todos || []);
});

// GET /todos/:todoId
router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const todo = (db.todos || []).find((t) => String(t.id) === String(todoId));
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  return res.status(200).json(todo);
});

// PUT /todos/update/:todoId
router.put("/update/:todoId", (req, res) => {
  const { todoId } = req.params;
  const { title, completed } = req.body;

  const db = readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  if (title !== undefined) todos[index].title = String(title).trim();
  if (completed !== undefined) todos[index].completed = Boolean(completed);

  db.todos = todos;
  writeDB(db);

  return res.status(200).json({ message: "Todo updated", todo: todos[index] });
});

// DELETE /todos/delete/:todoId
router.delete("/delete/:todoId", (req, res) => {
  const { todoId } = req.params;

  const db = readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) return res.status(404).json({ error: "Todo not found" });

  const deleted = todos.splice(index, 1)[0];

  db.todos = todos;
  writeDB(db);

  return res.status(200).json({ message: "Todo deleted", todo: deleted });
});

module.exports = router;
