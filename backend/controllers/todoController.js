// controllers/todoController.js
import Todo from '../models/Todo.js';
import logger from "../utils/logger.js";

// Create a new todo
export const createTodo = async (req, res) => {
  const { title } = req.body;
  try {
    const todo = new Todo({
      title,
      userId: req.userId ?? "679069b8b0d15c1117809052",
    });
    await todo.save();
    logger.info(`Todo created: ${title} by user ${req.userId}`);
    res.status(201).json(todo);
  } catch (error) {
    logger.error(`Error creating todo: ${error.message}`);
    res.status(500).json({ message: 'Error creating todo', error });
  }
};

// Get all todos for the authenticated user
export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.userId });
    logger.info(`Fetched todos for user ${req.userId}`);
    res.status(200).json(todos);
  } catch (error) {
    logger.error(`Error fetching todos for user ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Error fetching todos', error });
  }
};

// Update a todo by ID
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: id, userId: req.userId },
      { title, completed },
      { new: true },
    );
    if (!todo) {
      logger.warn(`Todo not found for user ${req.userId}, ID: ${id}`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    logger.info(`Todo updated: ${title} (ID: ${id}) by user ${req.userId}`);
    res.status(200).json(todo);
  } catch (error) {
    logger.error(`Error updating todo (ID: ${id}) for user ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Error updating todo', error });
  }
};

// Delete a todo by ID
export const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });
    if (!todo) {
      logger.warn(`Todo not found for user ${req.userId}, ID: ${id}`);
      return res.status(404).json({ message: 'Todo not found' });
    }
    logger.info(`Todo deleted: ID ${id} by user ${req.userId}`);
    res.status(200).json({ message: 'Todo deleted successfully' });
  } catch (error) {
    logger.error(`Error deleting todo (ID: ${id}) for user ${req.userId}: ${error.message}`);
    res.status(500).json({ message: 'Error deleting todo', error });
  }
};
