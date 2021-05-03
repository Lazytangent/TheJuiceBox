'use strict';
module.exports = (sequelize, DataTypes) => {
  const DrinkReview = sequelize.define('DrinkReview', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    drinkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
    isCreator: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    liked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  }, {});

  DrinkReview.associate = function(models) {
    DrinkReview.belongsTo(models.User, { foreignKey: 'userId' });
    DrinkReview.belongsTo(models.Drink, { foreignKey: 'drinkId' });
  };

  return DrinkReview;
};
