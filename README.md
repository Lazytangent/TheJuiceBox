## [Live Site](https://authenticateme.herokuapp.com/)

## Getting an error when you're trying to run the sequelize commands through heroku?

Add this option to the production section of the `./backend/config/database.js` file:

```javascript
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false,
  },
},
```

So your `database.js` file in your `config` directory in your `backend` should now look like this:

```javascript
const config = require('./index');

const db = config.db;
const username = db.username;
const password = db.password;
const database = db.database;
const host = db.host;

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
};
```
