'use strict';
const faker = require('faker');
const { User, Drink } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const users = await User.findAll();
    const drinks = await Drink.findAll();

    const reviews = [];

    for (let i = 0; i < 50; i++) {
      const userId = Math.ceil(Math.random() * users.length);
      const drinkId = Math.ceil(Math.random() * drinks.length);

      const review = {
        userId: userId,
        drinkId: drinkId,
        review: faker.lorem.paragraph(),
        stars: Math.ceil(Math.random() * 5),
      };
      reviews.push(review);
    }

    return queryInterface.bulkInsert('DrinkReviews', reviews, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('DrinkReviews', null, {});
  }
};
