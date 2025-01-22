// routes/todoRoutes.js
import express from 'express';
import { createTodo, getTodos, updateTodo, deleteTodo } from '../controllers/todoController.js';
import authenticate from '../middlewares/authenticate.js';

const router = express.Router();

// Todo routes
router.post('/', authenticate, createTodo);
router.get('/', authenticate, getTodos);
router.put('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);

export default router;
