const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const { testModelOptions, getCSRFTokens, loginUser } = require('../utils/test-utils');
const { sequelize, User, Drink } = require("../db/models");

describe("Drink routes", () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const fakeUser1 = {
    username: "testUser1",
    email: "test@aa.io",
    hashedPassword: bcrypt.hashSync("password"),
    dateOfBirth: new Date("1990-12-31"),
  };

  const fakeDrink1 = {
    name: "testDrink1",
    description: "testDescription",
    creatorId: 1,
  };
  const fakeDrink2 = {
    name: "testDrink2",
    description: "testDescription",
    creatorId: 1,
  };

  describe("GET /api/drinks", () => {
    it("should exist", async () => {
      await request(app).get("/api/drinks").expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .get("/api/drinks")
        .expect("Content-Type", /json/)
        .expect(200);
    });

    it("should return all drinks in the database", async () => {
      await User.create(fakeUser1, testModelOptions());
      await Drink.create(fakeDrink1, testModelOptions());
      await Drink.create(fakeDrink2, testModelOptions());

      const res = await request(app).get("/api/drinks").expect(200);

      expect(res.body).toEqual(
        expect.objectContaining({
          drinks: expect.arrayContaining([
            expect.objectContaining(fakeDrink1),
            expect.objectContaining(fakeDrink2),
          ]),
        })
      );
    });
  });

  describe("POST /api/drinks", () => {
    let jwtCookie;
    let tokens;

    beforeAll(async () => {
      jwtCookie = await loginUser(app);
      tokens = await getCSRFTokens(app);
    });

    it("should exist", async () => {
      await request(app)
        .post('/api/drinks')
        .set('XSRF-TOKEN', tokens.csrfToken)
        .set('Cookie', [tokens.csrfCookie, jwtCookie])
        .set('Accept', 'application/json')
        .send(fakeDrink1)
        .expect(200)
    });
  });
});
