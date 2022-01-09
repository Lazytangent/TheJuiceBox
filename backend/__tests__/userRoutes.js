const request = require("supertest");
const bcrypt = require("bcryptjs");

const app = require("../app");
const {
  testModelOptions,
  getCSRFTokens,
  loginUser,
} = require("../utils/test-utils");
const { sequelize, User } = require("../db/models");

describe("User routes", () => {
  let jwtCookie;
  let tokens;
  let testUser0;

  const testUser1 = {
    email: "user@test.io",
    username: "tester1",
    hashedPassword: bcrypt.hashSync("password"),
    dateOfBirth: "1984-02-26",
  };

  const testUser2 = {
    email: "user2@test.io",
    username: "tester2",
    hashedPassword: bcrypt.hashSync("password"),
    dateOfBirth: "1984-02-26",
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
    [jwtCookie, testUser0] = await loginUser(app);
    tokens = await getCSRFTokens(app);

    await User.create(testUser1, testModelOptions());
    await User.create(testUser2, testModelOptions());
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/users", () => {
    it("should exist", async () => {
      await request(app).get("/api/users").expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return a list of all the users in the database", async () => {
      const res = await request(app)
        .get("/api/users")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          users: expect.arrayContaining([
            expect.objectContaining({ id: 1, username: testUser0.username }),
            expect.objectContaining({ id: 2, username: testUser1.username }),
            expect.objectContaining({ id: 3, username: testUser2.username }),
          ]),
        })
      );
    });
  });
});
