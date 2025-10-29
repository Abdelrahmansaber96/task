import connectDB from '../../connect_db';
import Todo from '../api/todos/todoModel';
import { createTodo } from './actions';
import { TodoItem } from './TodoItem';

export const revalidate = 0;

export default async function TodosPage() {
  try {
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
        <form action={createTodo} style={{ marginBottom: 24, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            type="text"
            name="title"
            placeholder="What to do?"
            required
            style={{
              flex: 1,
              minWidth: 200,
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
              minWidth: 150,
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
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </ul>
        )}
      </div>
    );
  } catch (error) {
    console.error('Error loading todos page:', error);
    return (
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 20 }}>
        <h1>Error Loading Todos</h1>
        <p style={{ color: '#ff4444' }}>{error.message}</p>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }
}
