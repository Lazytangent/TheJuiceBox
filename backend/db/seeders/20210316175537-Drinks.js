'use strict';
const fs = require("fs");
const data = require("../seeder-content/drinks.json");
const { User, Drink } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const drinks = [];
    for (const drink of data) {
      drinks.push(({
        ...drink,
        creatorId: users[Math.floor(Math.random() * users.length)].id,
      }));
    }
    return queryInterface.bulkInsert('Drinks', drinks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drinks', null, {
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
};
