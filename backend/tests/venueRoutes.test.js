const request = require("supertest");
const app = require("../app");
const { testModelOptions, getCSRFTokens, loginUser } = require('../utils/test-utils');
const { sequelize, Venue } = require('../db/models');

describe("Venue routes", () => {
  let jwtCookie;
  let tokens;

  beforeAll(async () => {
    jwtCookie = await loginUser(app);
    tokens = await getCSRFTokens(app);
    await sequelize.sync({ force: true, logging: false });
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
