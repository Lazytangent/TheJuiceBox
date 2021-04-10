"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Venues", "city", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Venues", "state", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Venues", "lat", {
        type: Sequelize.NUMERIC,
      }),
      queryInterface.addColumn("Venues", "lng", {
        type: Sequelize.NUMERIC,
      }),
      queryInterface.removeColumn("Venues", "location"),
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn("Venues", "city"),
      queryInterface.removeColumn("Venues", "state"),
      queryInterface.removeColumn("Venues", "lat"),
      queryInterface.removeColumn("Venues", "lng"),
      queryInterface.addColumn("Venues", "location", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
    ]);
  },
};
