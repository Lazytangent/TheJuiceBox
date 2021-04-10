'use strict';
const fetch = require('node-fetch');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const drinksArr = [];
    while (drinksArr.length < 3) {
      const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      const { drinks } = await res.json();
      const { strDrink: name, strInstructions: description, strDrinkThumb: imageUrl } = drinks[0];
      if (!name.includes("Quick")) {
        const drink = { name, imageUrl, description, creatorId: 1 };
        drinksArr.push(drink);
      }
    }

    return queryInterface.bulkInsert('Drinks', drinksArr, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Drinks', {
      id: [1, 2, 3]
    }, {});
  }
};
