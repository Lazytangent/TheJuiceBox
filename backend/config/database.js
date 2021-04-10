const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

const testDB = db.test;
const testUsername = testDB.username;
const testPassword = testDB.password;
const testDatabase = testDB.database;
const testHost = testDB.host;

module.exports = {
  development: {
    username,
    password,
    database,
    host,
    dialect: 'postgres',
    seederStorage: 'sequelize',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
  test: {
    username: testUsername,
    password: testPassword,
    database: testDatabase,
    host: testHost,
    dialect: 'postgres',
  },
};
