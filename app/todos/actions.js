'use server';

import { revalidatePath } from 'next/cache';
import connectDB from '../../connect_db';
import Todo from '../api/todos/todoModel';

export async function createTodo(formData) {
  try {
    await connectDB();
    const title = formData.get('title')?.trim();
    const author = formData.get('author')?.trim() || 'Anonymous';

    if (!title) {
      return { error: 'Title is required' };
    }

    const todo = new Todo({
      title,
      author,
      completed: false,
    });

    await todo.save();
    revalidatePath('/todos');
    return { success: true };
  } catch (error) {
    console.error('Error creating todo:', error);
    return { error: 'Failed to create todo: ' + error.message };
  }
}

export async function toggleTodo(id) {
  try {
    await connectDB();
    const todo = await Todo.findById(id);
    if (!todo) {
      return { error: 'Todo not found' };
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    await todo.save();

    revalidatePath('/todos');
    return { success: true };
  } catch (error) {
    console.error('Error toggling todo:', error);
    return { error: 'Failed to toggle todo: ' + error.message };
  }
}

export async function updateTodo(id, formData) {
  try {
    await connectDB();
    const title = formData.get('title')?.trim();
    const author = formData.get('author')?.trim();

    if (!title) {
      return { error: 'Title is required' };
    }

    const update = { updatedAt: new Date() };
    if (title) update.title = title;
    if (author) update.author = author;

    const updated = await Todo.findByIdAndUpdate(id, update, { new: true });
    if (!updated) {
      return { error: 'Todo not found' };
    }

    revalidatePath('/todos');
    return { success: true };
  } catch (error) {
    console.error('Error updating todo:', error);
    return { error: 'Failed to update todo: ' + error.message };
  }
}

export async function deleteTodo(id) {
  try {
    await connectDB();
    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) {
      return { error: 'Todo not found' };
    }

    revalidatePath('/todos');
    return { success: true };
  } catch (error) {
    console.error('Error deleting todo:', error);
    return { error: 'Failed to delete todo: ' + error.message };
  }
}
