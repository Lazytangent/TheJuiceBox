'use strict';
const fs = require("fs");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const getData = async () => {
      const drinks [];
      fs.readFile("../seeder-content/drinks.json", (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
    }
    return queryInterface.bulkInsert('People', [{
      name: 'John Doe',
      isBetaMember: false
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('People', null, {});
  }
};
