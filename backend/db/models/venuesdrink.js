'use strict';
module.exports = (sequelize, DataTypes) => {
  const VenuesDrink = sequelize.define('VenuesDrink', {
    venueId: DataTypes.INTEGER,
    drinkId: DataTypes.INTEGER
  }, {});
  VenuesDrink.associate = function(models) {
    // associations can be defined here
  };
  return VenuesDrink;
};