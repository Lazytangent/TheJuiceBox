'use strict';
const faker = require('faker');
const bcrypt = require('bcryptjs');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
        username: 'Demo-Dave',
        hashedPassword: bcrypt.hashSync('password'),
        dateOfBirth: new Date('1990-12-31'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        dateOfBirth: new Date('1990-12-31'),
      },
      {
        email: faker.internet.email(),
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync(faker.internet.password()),
        dateOfBirth: new Date('1990-12-31'),
      },
      {
        email: 'testing@example.io',
        username: 'TheTest',
        hashedPassword: bcrypt.hashSync('password'),
        dateOfBirth: new Date('1980-01-31'),
      },
    ], {});
  },
  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-Dave', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
