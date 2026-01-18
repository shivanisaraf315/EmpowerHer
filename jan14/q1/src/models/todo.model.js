import { readDB, writeDB } from "../utils/fileDb.js";

function generateId() {
  return Date.now().toString();
}

export async function createTodo(title) {
  const db = await readDB();
  if (!db.todos) db.todos = [];

  const todo = {
    id: generateId(),
    title: String(title).trim(),
    completed: false
  };

  db.todos.push(todo);
  await writeDB(db);

  return todo;
}

export async function getAllTodos() {
  const db = await readDB();
  return db.todos || [];
}

export async function getTodoById(todoId) {
  const db = await readDB();
  const todo = (db.todos || []).find((t) => String(t.id) === String(todoId));
  return todo || null;
}

export async function updateTodo(todoId, updates) {
  const db = await readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) return null;

  if (updates.title !== undefined) {
    todos[index].title = String(updates.title).trim();
  }
  if (updates.completed !== undefined) {
    todos[index].completed = Boolean(updates.completed);
  }

  db.todos = todos;
  await writeDB(db);

  return todos[index];
}

export async function deleteTodo(todoId) {
  const db = await readDB();
  const todos = db.todos || [];

  const index = todos.findIndex((t) => String(t.id) === String(todoId));
  if (index === -1) return null;

  const deleted = todos.splice(index, 1)[0];
  db.todos = todos;
  await writeDB(db);

  return deleted;
}
