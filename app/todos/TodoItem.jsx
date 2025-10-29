'use client';

import { toggleTodoAction, deleteTodoAction } from './actions';

export function TodoItem({ todo }) {
  return (
    <li
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
      <form action={() => toggleTodoAction(todo._id)} style={{ display: 'inline' }}>
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
      <form action={() => deleteTodoAction(todo._id)} style={{ display: 'inline' }}>
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
  );
}
