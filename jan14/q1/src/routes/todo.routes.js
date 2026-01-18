import { Router } from "express";
import {
  addTodo,
  getTodos,
  getSingleTodo,
  updateSingleTodo,
  deleteSingleTodo
} from "../controllers/todo.controller.js";

const router = Router();

router.post("/add", addTodo);
router.get("/", getTodos);
router.get("/:todoId", getSingleTodo);
router.put("/update/:todoId", updateSingleTodo);
router.delete("/delete/:todoId", deleteSingleTodo);

export default router;
