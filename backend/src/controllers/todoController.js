let todos = [];
let nextId = 1;

const getAllTodos = (req, res) => {
  res.json({ success: true, data: todos });
};

const getTodoById = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }
  res.json({ success: true, data: todo });
};

const createTodo = (req, res) => {
  const { title, description } = req.body;
  
  if (!title || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }
  
  const todo = {
    id: nextId++,
    title: title.trim(),
    description: description ? description.trim() : '',
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  todos.push(todo);
  res.status(201).json({ success: true, data: todo });
};

const updateTodo = (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  
  if (!todo) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }
  
  const { title, description, completed } = req.body;
  
  if (title !== undefined) todo.title = title.trim();
  if (description !== undefined) todo.description = description.trim();
  if (completed !== undefined) todo.completed = Boolean(completed);
  todo.updatedAt = new Date().toISOString();
  
  res.json({ success: true, data: todo });
};

const deleteTodo = (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Todo not found' });
  }
  
  todos.splice(index, 1);
  res.json({ success: true, message: 'Todo deleted successfully' });
};

module.exports = {
  getAllTodos,
  getTodoById,
  createTodo,
  updateTodo,
  deleteTodo
};