import Todo from "../models/Todo.js";
import logger from "../utils/logger.js";

export const createTodo = async (req, res) => {
  console.log("🚀 ~ createTodo ~ req.user.id:", req.user.id);
  const { title, content } = req.body;
  try {
    const todo = new Todo({
      title,
      content,
      userId: req.user.id
    });
    await todo.save();
    logger.info(`Todo created: ${title} by user ${req.user.id}`);
    res.status(201).json(todo);
  } catch (error) {
    logger.error(`Error creating todo: ${error.message}`);
    res.status(500).json({ message: "Error creating todo", error });
  }
};

export const getTodos = async (req, res) => {
  console.log("🚀 ~ getTodos ~ req.user.id:", req.user.id);
  try {
    const todos = await Todo.find({ userId: req.user.id });
    logger.info(`Fetched todos for user ${req.user.id}`);
    res.status(200).json({ data: todos });
  } catch (error) {
    logger.error(
      `Error fetching todos for user ${req.user.id}: ${error.message}`
    );
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { title, content },
      { new: true }
    );

    if (!todo) {
      logger.warn(
        `Todo not found or not owned by user ${req.user.id}, ID: ${id}`
      );
      return res
        .status(404)
        .json({ message: "Todo not found or access denied" });
    }

    logger.info(`Todo updated: ${title} (ID: ${id}) by user ${req.user.id}`);
    res.status(200).json(todo);
  } catch (error) {
    logger.error(
      `Error updating todo (ID: ${id}) by user ${req.user.id}: ${error.message}`
    );
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.id });

    if (!todo) {
      logger.warn(
        `Todo not found or not owned by user ${req.user.id}, ID: ${id}`
      );
      return res
        .status(404)
        .json({ message: "Todo not found or access denied" });
    }

    logger.info(`Todo deleted: ID ${id} by user ${req.user.id}`);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    logger.error(
      `Error deleting todo (ID: ${id}) by user ${req.user.id}: ${error.message}`
    );
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
