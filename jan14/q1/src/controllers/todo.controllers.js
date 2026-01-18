import {
  createTodo,
  getAllTodos,
  getTodoById,
  updateTodo,
  deleteTodo
} from "../models/todo.model.js";

export async function addTodo(req, res, next) {
  try {
    const { title } = req.body;

    if (!title || typeof title !== "string" || title.trim().length === 0) {
      return res.status(400).json({ error: "title is required" });
    }

    const todo = await createTodo(title);
    return res.status(201).json({ message: "Todo created", todo });
  } catch (err) {
    next(err);
  }
}

export async function getTodos(req, res, next) {
  try {
    const todos = await getAllTodos();
    return res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
}

export async function getSingleTodo(req, res, next) {
  try {
    const { todoId } = req.params;

    const todo = await getTodoById(todoId);
    if (!todo) return res.status(404).json({ error: "Todo not found" });

    return res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
}

export async function updateSingleTodo(req, res, next) {
  try {
    const { todoId } = req.params;
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({ error: "Nothing to update" });
    }

    const updated = await updateTodo(todoId, { title, completed });
    if (!updated) return res.status(404).json({ error: "Todo not found" });

    return res.status(200).json({ message: "Todo updated", todo: updated });
  } catch (err) {
    next(err);
  }
}

export async function deleteSingleTodo(req, res, next) {
  try {
    const { todoId } = req.params;

    const deleted = await deleteTodo(todoId);
    if (!deleted) return res.status(404).json({ error: "Todo not found" });

    return res.status(200).json({ message: "Todo deleted", todo: deleted });
  } catch (err) {
    next(err);
  }
}
