import { NextResponse } from 'next/server';
import connectDB from '../../../connect_db';
import Todo from './todoModel';

export const GET = async () => {
  try {
    await connectDB();
    const todos = await Todo.find().sort({ createdAt: -1 });
    

    const responseData = todos.map((todo) => ({
      _id: todo._id.toString(),
      title: todo.title,
      author: todo.author,
      completed: todo.completed,
      createdAt: todo.createdAt ? todo.createdAt.toISOString() : null,
      updatedAt: todo.updatedAt ? todo.updatedAt.toISOString() : null,
    }));
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching todos:', error);
    return NextResponse.json({ error: 'Failed to fetch todos', details: error.message }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const { title, author } = body;
    if (!title || typeof title !== 'string') {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    const todo = new Todo({ title, author: author || 'Anonymous', completed: false });
    const savedTodo = await todo.save();

    const responseData = {
      _id: savedTodo._id.toString(),
      title: savedTodo.title,
      author: savedTodo.author,
      completed: savedTodo.completed,
      createdAt: savedTodo.createdAt ? savedTodo.createdAt.toISOString() : null,
      updatedAt: savedTodo.updatedAt ? savedTodo.updatedAt.toISOString() : null,
    };
    
    return NextResponse.json(responseData, { status: 201 });
  } catch (error) {
    console.error('Error creating todo:', error);
    return NextResponse.json({ error: 'Failed to create todo', details: error.message }, { status: 500 });
  }
};

export const PATCH = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const { id, title, author, completed } = body;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const update = {};
    if (title !== undefined) update.title = title;
    if (author !== undefined) update.author = author;
    if (completed !== undefined) update.completed = completed;
    update.updatedAt = new Date();

    const updated = await Todo.findByIdAndUpdate(id, update, { new: true });
    if (!updated) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    

    const responseData = {
      _id: updated._id.toString(),
      title: updated.title,
      author: updated.author,
      completed: updated.completed,
      createdAt: updated.createdAt ? updated.createdAt.toISOString() : null,
      updatedAt: updated.updatedAt ? updated.updatedAt.toISOString() : null,
    };
    
    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error updating todo:', error);
    return NextResponse.json({ error: 'Failed to update todo', details: error.message }, { status: 500 });
  }
};

export const DELETE = async (request) => {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = body;
    if (!id) return NextResponse.json({ error: 'id is required' }, { status: 400 });

    const deleted = await Todo.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting todo:', error);
    return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
  }
};

