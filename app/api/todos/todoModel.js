import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new Schema({
  title: String,
  author: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todosSchema);

export default Todo;
