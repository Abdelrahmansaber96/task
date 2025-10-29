import connectDB from '../../connect_db';
import Todo from '../api/todos/todoModel';
import { createTodo, toggleTodo, deleteTodo, updateTodo } from './actions';

export const revalidate = 0;

export default async function TodosPage() {
  await connectDB();
  const todosRaw = await Todo.find().sort({ createdAt: -1 });

  const todos = todosRaw.map((t) => ({
    _id: t._id.toString(),
    title: t.title,
    author: t.author,
    completed: !!t.completed,
    createdAt: t.createdAt ? t.createdAt.toISOString() : null,
  }));

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
      <h1>📝 Todos</h1>

      {/* Create Todo Form */}
      <form action={createTodo} style={{ marginBottom: 24, display: 'flex', gap: 8 }}>
        <input
          type="text"
          name="title"
          placeholder="What to do?"
          required
          style={{
            flex: 1,
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: 4,
          }}
        />
        <input
          type="text"
          name="author"
          placeholder="Your name (optional)"
          style={{
            padding: '8px 12px',
            border: '1px solid #ccc',
            borderRadius: 4,
            width: 150,
          }}
        />
        <button
          type="submit"
          style={{
            padding: '8px 16px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer',
            fontWeight: 500,
          }}
        >
          Add
        </button>
      </form>

      {/* Todos List */}
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#666' }}>No todos yet. Create one above!</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <li
              key={todo._id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: 12,
                marginBottom: 8,
                backgroundColor: '#f5f5f5',
                borderRadius: 4,
                borderLeft: `4px solid ${todo.completed ? '#ccc' : '#0070f3'}`,
              }}
            >
              {/* Toggle Completed */}
              <form action={async () => { 'use server'; await toggleTodo(todo._id); }} style={{ display: 'inline' }}>
                <button
                  type="submit"
                  style={{
                    width: 24,
                    height: 24,
                    padding: 0,
                    border: `2px solid ${todo.completed ? '#0070f3' : '#ccc'}`,
                    backgroundColor: todo.completed ? '#0070f3' : 'white',
                    borderRadius: 4,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                  }}
                >
                  {todo.completed ? '✓' : ''}
                </button>
              </form>

              {/* Todo Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#999' : '#000',
                    fontWeight: 500,
                  }}
                >
                  {todo.title}
                </div>
                <div style={{ fontSize: 12, color: '#666', marginTop: 4 }}>
                  {todo.author} • {new Date(todo.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Delete Button */}
              <form action={async () => { 'use server'; await deleteTodo(todo._id); }} style={{ display: 'inline' }}>
                <button
                  type="submit"
                  style={{
                    padding: '6px 12px',
                    backgroundColor: '#ff4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: 4,
                    cursor: 'pointer',
                    fontSize: 12,
                  }}
                >
                  Delete
                </button>
              </form>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
