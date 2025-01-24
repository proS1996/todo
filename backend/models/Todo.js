import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Ensure `userId` is defined
});


const Todo = mongoose.model('Todo', todoSchema);

export default Todo;
