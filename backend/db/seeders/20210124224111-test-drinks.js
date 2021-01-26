'use strict';
const fetch = require('node-fetch');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const drinksArr = [];
    for (let i = 0; i < 3; i++) {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const { drinks } = await res.json();
      const { strDrink: name, strInstructions: description, strDrinkThumb: imageUrl, creatorId: 1 } = drinks[0];
      const drink = { name, imageUrl, description };
      drinksArr.push(drink);
    }

    return queryInterface.bulkInsert('Drinks', drinksArr, {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('Drinks', {
      id: { [Sequelize.Op.in]: ['1', '2', '3'] }
    }, {});
  }
};
