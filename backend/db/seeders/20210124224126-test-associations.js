'use strict';

const { User, Drink } = require('../models/index');
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('DrinkReviews', [
      {
        userId: 1,
        drinkId: 1,
        review: 'That was some good stuff',
        isCreator: false,
        liked: true,
        stars: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DrinkReviews', null, {});
  }
};
