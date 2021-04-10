'use strict';
const fs = require("fs");
const data = require("../seeder-content/drinks.json");
const { Drink } = require("../models");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const drinks = [];
    for (const drink of data) {
      drinks.push(drink);
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
