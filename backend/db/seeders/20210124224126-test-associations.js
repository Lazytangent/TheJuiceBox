'use strict';

const { User, Drink } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const demo1 = await User.findByPk(1);
    const demo2 = await User.findByPk(2);
    const demo3 = await User.findByPk(3);

    const drink1 = await Drink.findByPk(1);
    const drink2 = await Drink.findByPk(2);
    const drink3 = await Drink.findByPk(3);

    return queryInterface.bulkInsert('DrinkReviews', [
      {
        userId: demo1.id,
        drinkId: drink1.id,
        review: 'That was some good stuff',
        isCreator: false,
        liked: true,
        stars: 3,
      },
      {
        userId: demo2.id,
        drinkId: drink1.id,
        isCreator: true,
        liked: true,
      },
      {
        userId: demo3.id,
        drinkId: drink1.id,
        review: 'That was some good stuff',
        isCreator: false,
        liked: true,
        stars: 3,
      },
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('DrinkReviews', {
      id: { [Sequelize.Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
