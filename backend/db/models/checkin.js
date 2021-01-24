'use strict';
module.exports = (sequelize, DataTypes) => {
  const CheckIn = sequelize.define('CheckIn', {
    userId: DataTypes.INTEGER,
    venueId: DataTypes.INTEGER,
    timestamp: DataTypes.DATE,
    review: DataTypes.TEXT,
    liked: DataTypes.BOOLEAN,
    stars: DataTypes.INTEGER
  }, {});
  CheckIn.associate = function(models) {
    // associations can be defined here
  };
  return CheckIn;
};