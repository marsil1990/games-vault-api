const request = require('supertest');
const app = require('../server');
const mongoose = require('mongoose');
const mockingoose = require('mockingoose');

// We import the models so we can mock them.
const Game = require('../models/Game');
const Genre = require('../models/Genre');
const Platform = require('../models/Platform');
const Studio = require('../models/Studio');

describe('API Endpoints', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  it('GET / should return 200 and a welcome message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Enter /login');
  });

  it('GET /api-docs should return 301 (redirect)', async () => {
    const response = await request(app).get('/api-docs');
    // Swagger UI redirects from /api-docs to /api-docs/, so we expect a 301
    expect(response.statusCode).toBe(301);
  });

  it('GET /games should return 200', async () => {
    mockingoose(Game).toReturn([], 'find');
    const response = await request(app).get('/games');
    expect(response.statusCode).toBe(200);
  });

  it('GET /genres should return 200', async () => {
    mockingoose(Genre).toReturn([], 'find');
    const response = await request(app).get('/genres');
    expect(response.statusCode).toBe(200);
  });

  it('GET /platforms should return 200', async () => {
    mockingoose(Platform).toReturn([], 'find');
    const response = await request(app).get('/platforms');
    expect(response.statusCode).toBe(200);
  });

  it('GET /studios should return 200', async () => {
    mockingoose(Studio).toReturn([], 'find');
    const response = await request(app).get('/studios');
    expect(response.statusCode).toBe(200);
  });
});
