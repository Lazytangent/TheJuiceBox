const request = require("supertest");
const app = require("../app");
const { testModelOptions, getCSRFTokens, loginUser } = require('../utils/test-utils');
const { sequelize, Venue } = require('../db/models');

describe("Venue routes", () => {
  let jwtCookie;
  let tokens;

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
    jwtCookie = await loginUser(app);
    tokens = await getCSRFTokens(app);
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const fakeVenue1 = {
    name: 'Test Venue1',
    city: 'New York City',
    state: 'New York',
  };

  const fakeVenue2 = {
    name: 'Test Venue2',
    city: 'San Francisco',
    state: 'California',
  };

  describe("GET /api/venues", () => {
    it("should exist", async () => {
      await request(app)
        .get('/api/venues')
        .expect(200)
    });

    it("should return JSON", async () => {
      await request(app)
        .get('/api/venues')
        .expect(200)
        .expect('Content-Type', /json/)
    });

    it("should return all venues in the database", async () => {
      await Venue.create(fakeVenue1, testModelOptions());
      await Venue.create(fakeVenue2, testModelOptions());

      const res = await request(app)
        .get('/api/venues')
        .expect(200)
        .expect('Content-Type', /json/)

      expect(res.body).toEqual(
        expect.objectContaining({
          venues: expect.arrayContaining([
            expect.objectContaining(fakeVenue1),
            expect.objectContaining(fakeVenue2),
          ]),
        }),
      );
    });
  });

  describe("POST /api/venues/:venueId/checkIn", () => {
    it("should exist", async () => {

    });

    it("should return JSON", async () => {

    });

    it("should return the checkIn object that was created when good data is passed in", async () => {

    });

    it("should return an error when bad data gets passed in", async () => {

    });

    it("should return an error if there is no user authenticated", async () => {

    });
  });
});
