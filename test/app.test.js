const request = require('supertest');
const app = require('../server'); // Assuming your server.js exports the Express app

describe('GET /', () => {
  it('responds with Hello DevOps!', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello DevOps!');
  });
});
