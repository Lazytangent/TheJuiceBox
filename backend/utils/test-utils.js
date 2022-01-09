const request = require("supertest");
const { User } = require("../db/models");

const testUser = {
  username: "testUser1",
  email: "test@aa.io",
  password: "password",
  dateOfBirth: new Date("1990-12-31"),
};

const getCSRFTokens = async (app) => {
  const response = await request(app).get("/api/csrf/restore");

  const csrfCookie = response.headers["set-cookie"].find((cookie) =>
    cookie.match(/^_csrf/)
  );
  const csrfToken = response.headers["set-cookie"]
    .find((cookie) => cookie.match(/^XSRF-TOKEN/))
    .split(/[=;]/)[1];

  return {
    csrfCookie,
    csrfToken,
  };
};

const loginUser = async (app) => {
  const { csrfToken, csrfCookie } = await getCSRFTokens(app);
  let user = await User.findOne({
    where: { username: "testUser1" },
  });
  if (!user) {
    user = await User.signup(testUser);
  }
  const response = await request(app)
    .post("/api/session")
    .set("Cookie", csrfCookie)
    .set("XSRF-TOKEN", csrfToken)
    .send({
      credential: testUser.username,
      password: testUser.password,
    });

  const tokenCookie = response.headers["set-cookie"].find((cookie) =>
    cookie.match(/^token/)
  );

  return [tokenCookie, user];
};

const testModelOptions = () => ({
  logging: false,
});

module.exports = {
  testModelOptions,
  testUser,
  getCSRFTokens,
  loginUser,
};
