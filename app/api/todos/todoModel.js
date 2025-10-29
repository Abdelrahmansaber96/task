import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new Schema({
  title: String, 
  author: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Prevent model overwrite error in serverless environments
export default mongoose.models.Todo || mongoose.model('Todo', todosSchema);