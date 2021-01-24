'use strict';
module.exports = (sequelize, DataTypes) => {
  const DrinkReview = sequelize.define('DrinkReview', {
    userId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER,
    review: DataTypes.TEXT,
    isCreator: DataTypes.BOOLEAN,
    liked: DataTypes.BOOLEAN,
    stars: DataTypes.INTEGER
  }, {});
  DrinkReview.associate = function(models) {
    // associations can be defined here
  };
  return DrinkReview;
};