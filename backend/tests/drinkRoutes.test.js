const request = require('supertest');
const app = require('../app');
const { sequelize, User } = require('../db/models');

describe('Drink routes', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe('GET /api/drinks', () => {
    it('should exist', async () => {
      await request(app)
        .get('/api/drinks')
        .expect(200)
    });

    it('should return JSON', async () => {
      await request(app)
        .get('/api/drinks')
        .expect('Content-Type', /json/)
        .expect(200)
    });

    it('should return all drinks in the database', async () => {
      const fakeDrink1 = {

      };
    })
  });
});
