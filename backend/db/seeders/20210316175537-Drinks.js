'use strict';
const fs = require("fs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    let drinks;
    const getData = async () => {
      fs.readFile("../seeder-content/drinks.json", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        drinks = JSON.parse(data);
      });
    }
    return queryInterface.bulkInsert('Drinks', drinks, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drinks', null, {});
  }
};
