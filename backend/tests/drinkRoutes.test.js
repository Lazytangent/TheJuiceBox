const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const { sequelize, User, Drink } = require("../db/models");

beforeAll(async () => {
  await sequelize.sync({ force: true, logging: false });
});

afterAll(async () => {
  await sequelize.close();
});

describe("Drink routes", () => {
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

      await User.create(fakeUser1);
      await Drink.create(fakeDrink1);
      await Drink.create(fakeDrink2);

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
});
