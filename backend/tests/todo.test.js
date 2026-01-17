const request = require('supertest');
const app = require('../src/app');

describe('Todo API Tests', () => {
  describe('GET /health', () => {
    test('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('POST /api/todos', () => {
    test('should create a new todo', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ title: 'Test Todo', description: 'Test Description' });
      
      expect(res.statusCode).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Test Todo');
      expect(res.body.data.completed).toBe(false);
    });

    test('should fail without title', async () => {
      const res = await request(app)
        .post('/api/todos')
        .send({ description: 'No title' });
      
      expect(res.statusCode).toBe(400);
      expect(res.body.success).toBe(false);
    });
  });

  describe('GET /api/todos', () => {
    test('should return all todos', async () => {
      const res = await request(app).get('/api/todos');
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('PUT /api/todos/:id', () => {
    test('should update a todo', async () => {
      // Create a todo first
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Update Test' });
      
      const todoId = createRes.body.data.id;
      
      // Update it
      const res = await request(app)
        .put(`/api/todos/${todoId}`)
        .send({ completed: true });
      
      expect(res.statusCode).toBe(200);
      expect(res.body.data.completed).toBe(true);
    });
  });

  describe('DELETE /api/todos/:id', () => {
    test('should delete a todo', async () => {
      // Create a todo first
      const createRes = await request(app)
        .post('/api/todos')
        .send({ title: 'Delete Test' });
      
      const todoId = createRes.body.data.id;
      
      // Delete it
      const res = await request(app).delete(`/api/todos/${todoId}`);
      expect(res.statusCode).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});