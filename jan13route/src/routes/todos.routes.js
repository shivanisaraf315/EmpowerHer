const express = require("express");
const fs = require("fs");
const path = require("path");

const rateLimiterMiddleware = require("../middleware/rateLimiter.middleware");
const validateTodoMiddleware = require("../middleware/validateTodo.middleware");

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

// CREATE TODO
router.post("/add", validateTodoMiddleware, (req, res) => {
  const db = readDB();
  if (!db.todos) db.todos = [];

  const newTodo = {
    id: generateId(),
    title: req.body.title,
  };

  db.todos.push(newTodo);
  writeDB(db);

  res.status(201).json({ message: "Todo created", todo: newTodo });
});

// GET ALL TODOS (rate limited)
router.get("/", rateLimiterMiddleware, (req, res) => {
  const db = readDB();
  res.status(200).json(db.todos || []);
});

// GET SINGLE TODO
router.get("/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();

  const todo = (db.todos || []).find((t) => String(t.id) === String(todoId));
  if (!todo) {
    return res.status(404).json({ error: "Todo not found" });
  }

  res.status(200).json(todo);
});

// UPDATE TODO
router.put("/update/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  // Keep it simple: allow updating title only (ignore extra fields safely)
  if (typeof req.body.title === "string" && req.body.title.trim().length > 0) {
    todos[index].title = req.body.title.trim();
  }

  db.todos = todos;
  writeDB(db);

  res.status(200).json({ message: "Todo updated", todo: todos[index] });
});

// DELETE TODO
router.delete("/delete/:todoId", (req, res) => {
  const { todoId } = req.params;
  const db = readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) {
    return res.status(404).json({ error: "Todo not found" });
  }

  const deleted = todos.splice(index, 1)[0];
  db.todos = todos;
  writeDB(db);

  res.status(200).json({ message: "Todo deleted", todo: deleted });
});

module.exports = router;
