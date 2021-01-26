'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Drinks', 'creatorId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Drinks', 'creatorId');
  }
};
