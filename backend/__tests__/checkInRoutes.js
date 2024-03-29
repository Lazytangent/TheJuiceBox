const request = require("supertest");
const app = require("../app");
const {
  testModelOptions,
  getCSRFTokens,
  loginUser,
} = require("../utils/test-utils");
const { sequelize, Venue, CheckIn } = require("../db/models");

describe("CheckIn routes", () => {
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

  describe("PUT /api/checkIns/:checkInId", () => {
    let checkIn;
    const timestamp = new Date();
    beforeAll(async () => {
      checkIn = await CheckIn.create({ userId: 1, venueId: 1, timestamp });
    });

    it("should exist", async () => {
      await request(app)
        .put(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ stars: 4, timestamp })
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .put(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ stars: 4, timestamp })
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return the checkIn object that was created when good data is passed in", async () => {
      const res = await request(app)
        .put(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ stars: 5, timestamp })
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(expect.objectContaining({ stars: 5 }));
    });

    it("should return an error when bad data gets passed in", async () => {
      await request(app)
        .put(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .send({ stars: -1, timestamp })
        .expect(400);
    });

    it("should return an error if there is no user authenticated", async () => {
      await request(app)
        .put(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .send({ stars: 2, timestamp })
        .expect(403);
    });
  });

  describe("DELETE /api/checkIns/:checkInId", () => {
    let checkIn;

    beforeEach(async () => {
      checkIn = await CheckIn.create({
        venueId: 1,
        userId: 1,
        timestamp: new Date(),
      });
    });

    it("should exist", async () => {
      await request(app)
        .delete(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .expect(200);
    });

    it("should return JSON", async () => {
      await request(app)
        .delete(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);
    });

    it("should return a message upon a successful deletion", async () => {
      const res = await request(app)
        .delete(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie, jwtCookie])
        .set("Accept", "application/json")
        .expect(200)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Successfully deleted.",
        })
      );
    });

    it("should return an error message if no user authenticated", async () => {
      const res = await request(app)
        .delete(`/api/checkIns/${checkIn.id}`)
        .set("XSRF-TOKEN", tokens.csrfToken)
        .set("Cookie", [tokens.csrfCookie])
        .set("Accept", "application/json")
        .expect(401)
        .expect("Content-Type", /json/);

      expect(res.body).toEqual(
        expect.objectContaining({
          message: "Unauthorized",
        })
      );
    });
  });
});
