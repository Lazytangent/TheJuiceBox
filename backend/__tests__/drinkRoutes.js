const request = require("supertest");

const app = require("../app");
const {
  testModelOptions,
  getCSRFTokens,
  loginUser,
} = require("../utils/test-utils");
const { sequelize, Drink } = require("../db/models");

describe("Drink routes", () => {
  let jwtCookie;
  let tokens;

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
    [jwtCookie] = await loginUser(app);
    tokens = await getCSRFTokens(app);
  });

  afterAll(async () => {
    await sequelize.close();
  });

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
    describe("when the user is logged in", () => {
      it("should exist", async () => {
        await request(app)
          .get("/api/drinks")
          .set("Cookie", jwtCookie)
          .expect(200);
      });

      it("should return JSON", async () => {
        await request(app)
          .get("/api/drinks")
          .set("Cookie", jwtCookie)
          .expect("Content-Type", /json/)
          .expect(200);
      });

      it("should return all drinks in the database if a user is logged in", async () => {
        await Drink.create(fakeDrink1, testModelOptions());
        await Drink.create(fakeDrink2, testModelOptions());

        const res = await request(app)
          .get("/api/drinks")
          .set("Cookie", jwtCookie)
          .expect(200);

        expect(res.body).toEqual(
          expect.objectContaining({
            1: expect.objectContaining(fakeDrink1),
            2: expect.objectContaining(fakeDrink2),
          })
        );
      });
    });

    describe("when the user is not logged in", () => {
      it("should return a 401 Unauthorized error", () => {});
    });
  });

  describe("POST /api/drinks", () => {
    it("should exist", async () => {
      await request(app)
        .post("/api/drinks")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeDrink1)
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .post("/api/drinks")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeDrink1)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the drink that was created", async () => {
      const res = await request(app)
        .post("/api/drinks")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeDrink1)
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({ drink: expect.objectContaining(fakeDrink1) })
      );
    });

    it("should return an error if there is no authenticated user", async () => {
      await request(app).post("/api/drinks").send(fakeDrink1).expect(403);
    });
  });

  describe("PUT /api/drinks/:drinkId", () => {
    let drink;
    const updateDrink = {
      name: "Something different",
      description: "New Description",
    };
    beforeAll(async () => {
      drink = await Drink.findOne();
    });

    it("should exist", async () => {
      await request(app)
        .put(`/api/drinks/${drink.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(updateDrink)
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .put(`/api/drinks/${drink.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(updateDrink)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the drink that was updated", async () => {
      const res = await request(app)
        .put(`/api/drinks/${drink.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(updateDrink)
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({ drink: expect.objectContaining(updateDrink) })
      );
    });

    it("should return an error if there is no authenticated user", async () => {
      await request(app)
        .put(`/api/drinks/${drink.id}`)
        .send(updateDrink)
        .expect(403);
    });
  });
});
