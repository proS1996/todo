import Todo from "../models/Todo.js";
import logger from "../utils/logger.js";

export const createTodo = async (req, res) => {
  const { title, content } = req.body;
  try {
    const todo = new Todo({ title, content });
    await todo.save();
    logger.info(`Todo created: ${title}`);
    res.status(201).json(todo);
  } catch (error) {
    logger.error(`Error creating todo: ${error.message}`);
    res.status(500).json({ message: "Error creating todo", error });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    logger.info("Fetched all todos");
    res.status(200).json({ data: todos });
  } catch (error) {
    logger.error(`Error fetching todos: ${error.message}`);
    res.status(500).json({ message: "Error fetching todos", error });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!todo) {
      logger.warn(`Todo not found, ID: ${id}`);
      return res.status(404).json({ message: "Todo not found" });
    }
    logger.info(`Todo updated: ${title} (ID: ${id})`);
    res.status(200).json(todo);
  } catch (error) {
    logger.error(`Error updating todo (ID: ${id}): ${error.message}`);
    res.status(500).json({ message: "Error updating todo", error });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      logger.warn(`Todo not found, ID: ${id}`);
      return res.status(404).json({ message: "Todo not found" });
    }
    logger.info(`Todo deleted: ID ${id}`);
    res.status(200).json({ message: "Todo deleted successfully" });
  } catch (error) {
    logger.error(`Error deleting todo (ID: ${id}): ${error.message}`);
    res.status(500).json({ message: "Error deleting todo", error });
  }
};
