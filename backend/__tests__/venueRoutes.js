const request = require("supertest");
const app = require("../app");
const {
  testModelOptions,
  getCSRFTokens,
  loginUser,
} = require("../utils/test-utils");
const { sequelize, Venue, User } = require("../db/models");

describe("Venue routes", () => {
  let jwtCookie;
  let tokens;

  const fakeVenue1 = {
    name: "Test Venue1",
    city: "New York City",
    state: "New York",
    userId: 1,
  };

  const fakeVenue2 = {
    name: "Test Venue2",
    city: "San Francisco",
    state: "California",
    userId: 1,
  };

  beforeAll(async () => {
    await sequelize.sync({ force: true, logging: false });
    [jwtCookie] = await loginUser(app);
    tokens = await getCSRFTokens(app);
    await Venue.create(fakeVenue1, testModelOptions());
    await Venue.create(fakeVenue2, testModelOptions());
  });

  afterAll(async () => {
    await sequelize.close();
  });

  describe("GET /api/venues", () => {
    it("should exist", async () => {
      await request(app).get("/api/venues").expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .get("/api/venues")
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return all venues in the database", async () => {
      const res = await request(app)
        .get("/api/venues")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          1: expect.objectContaining(fakeVenue1),
          2: expect.objectContaining(fakeVenue2),
        })
      );
    });
  });

  describe("POST /api/venues", () => {
    const fakeVenueData = {
      name: "Test1",
      userId: 1,
      city: "Some city",
      state: "Some state",
    };

    it("should exist", async () => {
      await request(app)
        .post("/api/venues")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeVenueData)
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .post("/api/venues")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeVenueData)
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the newly created venue", async () => {
      const res = await request(app)
        .post("/api/venues")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send(fakeVenueData)
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          venue: expect.objectContaining(fakeVenueData),
        })
      );
    });

    it("should return an error if there is no authenticated user", async () => {
      await request(app)
        .post("/api/venues")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie])
        .set("Accept", "application/json")
        .send(fakeVenueData)
        .expect(401);
    });
  });

  describe("GET /api/venues/:id", () => {
    it.todo("should exist");
    it.todo("should return JSON");
    it.todo("should return the venue with the id");
    it.todo("should return an error if there is no authenticated user");
    it.todo("should return an error if there is no venue with the id");
  });

  describe("PUT /api/venues/:id", () => {
    it.todo("should exist");
    it.todo("should return JSON");
    it.todo("should return the updated venue");
    it.todo("should return an error if there is no authenticated user");
    it.todo("should return an error if there is no venue with the id");
  });

  describe("DELETE /api/venues/:id", () => {
    it.todo("should exist");
    it.todo("should return JSON");
    it.todo("should return the deleted venue");
    it.todo("should return an error if there is no authenticated user");
    it.todo("should return an error if there is no venue with the id");
  });

  describe("POST /api/venues/:venueId/checkIns", () => {
    it("should exist", async () => {
      await request(app)
        .post("/api/venues/1/checkIns")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ timestamp: new Date() })
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .post("/api/venues/1/checkIns")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ timestamp: new Date() })
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the checkIn object that was created when good data is passed in", async () => {
      const timestamp = new Date();
      const res = await request(app)
        .post("/api/venues/1/checkIns")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ timestamp })
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          userId: 1,
          venueId: 1,
          timestamp: timestamp.toISOString(),
        })
      );
    });

    it("should return an error if the timestamp for the checkIn is in the future", async () => {
      await request(app)
        .post("/api/venues/1/checkIns")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ timestamp: new Date("2200-12-31") })
        .expect(400);
    });

    it("should return an error if there is no user authenticated", async () => {
      await request(app)
        .post("/api/venues/1/checkIns")
        .set("XSRF-TOKEN", tokens.csrfToken)
        .send({ timestamp: new Date() })
        .expect(403);
    });
  });
});
