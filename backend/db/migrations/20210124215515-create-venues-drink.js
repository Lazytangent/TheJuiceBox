"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("VenuesDrinks", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      venueId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Venues",
        },
      },
      drinkId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Drinks",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("VenuesDrinks");
  },
};
