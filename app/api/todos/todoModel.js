import mongoose from 'mongoose';
const { Schema } = mongoose;

const todosSchema = new Schema({
  title: String, 
  author: String,
  completed: Boolean,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default  mongoose.model('Todo', todosSchema);