'use strict';
module.exports = (sequelize, DataTypes) => {
  const VenuesDrink = sequelize.define('VenuesDrink', {
    venueId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    drinkId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  VenuesDrink.associate = function(models) {
    // associations can be defined here
  };
  return VenuesDrink;
};
