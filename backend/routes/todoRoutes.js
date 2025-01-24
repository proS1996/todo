import express from "express";
import {
  createTodo,
  getTodos,
  updateTodo,
  deleteTodo
} from "../controllers/todoController.js";
import authenticate from "../middlewares/authenticate.js";

const router = express.Router();
router.use(authenticate)

router.post("/", createTodo);
router.get("/", getTodos);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);

export default router;
