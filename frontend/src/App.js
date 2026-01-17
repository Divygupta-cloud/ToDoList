import React, { useState, useEffect } from 'react';
import './App.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/todos`);
      const data = await response.json();
      setTodos(data.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch todos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const response = await fetch(`${API_URL}/todos`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description })
      });
      const data = await response.json();
      setTodos([...todos, data.data]);
      setTitle('');
      setDescription('');
      setError('');
    } catch (err) {
      setError('Failed to add todo');
      console.error(err);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find(t => t.id === id);
    try {
      const response = await fetch(`${API_URL}/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: !todo.completed })
      });
      const data = await response.json();
      setTodos(todos.map(t => t.id === id ? data.data : t));
    } catch (err) {
      setError('Failed to update todo');
      console.error(err);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${API_URL}/todos/${id}`, {
        method: 'DELETE'
      });
      setTodos(todos.filter(t => t.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1>📝 Todo List</h1>
        <p className="subtitle">DevOps Practice Project</p>

        {error && <div className="error">{error}</div>}

        <form onSubmit={addTodo} className="todo-form">
          <input
            type="text"
            placeholder="Todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
          />
          <input
            type="text"
            placeholder="Description (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="input"
          />
          <button type="submit" className="btn btn-primary">
            Add Todo
          </button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="todo-list">
            {todos.length === 0 ? (
              <p className="empty">No todos yet. Add one above!</p>
            ) : (
              todos.map(todo => (
                <div key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
                  <div className="todo-content">
                    <h3>{todo.title}</h3>
                    {todo.description && <p>{todo.description}</p>}
                  </div>
                  <div className="todo-actions">
                    <button
                      onClick={() => toggleTodo(todo.id)}
                      className="btn btn-toggle"
                    >
                      {todo.completed ? '↩️ Undo' : '✅ Complete'}
                    </button>
                    <button
                      onClick={() => deleteTodo(todo.id)}
                      className="btn btn-delete"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;