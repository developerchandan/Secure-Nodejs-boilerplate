const request = require('supertest');
const app = require('./././../../app'); 
const User = require('../../models/User'); 
const mongoose = require('mongoose');

describe('Auth Controller', () => {
  beforeAll(async () => {
    // Connect to a test database
    await mongoose.connect(process.env.TEST_MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the test database
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear the users collection before each test
    await User.deleteMany({});
  });

  describe('POST /api/v1/users/register', () => {
    it('should register a new user', async () => {
      const res = await request(app)
        .post('/api/v1/users/register')
        .send({
          name: 'Test User',
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(201);
      expect(res.body.status).toBe('success');
      expect(res.body.token).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe('test@example.com');
    });

    it('should return an error if user already exists', async () => {
      // First, create a user
      await User.create({
        name: 'Existing User',
        email: 'existing@example.com',
        password: 'password123'
      });

      // Try to register the same user again
      const res = await request(app)
        .post('/api/v1/users/register')
        .send({
          name: 'Existing User',
          email: 'existing@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(400);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('User already exists');
    });
  });

  describe('POST /api/v1/users/login', () => {
    it('should login a user and return a token', async () => {
      // First, create a user
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });

      // Try to login
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('success');
      expect(res.body.token).toBeDefined();
      expect(res.body.data.user).toBeDefined();
      expect(res.body.data.user.email).toBe('test@example.com');
    });

    it('should return an error for invalid credentials', async () => {
      const res = await request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'wrongpassword'
        });

      expect(res.statusCode).toBe(401);
      expect(res.body.status).toBe('error');
      expect(res.body.message).toBe('Invalid email or password');
    });
  });
});