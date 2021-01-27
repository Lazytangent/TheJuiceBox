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
    VenuesDrink.belongsTo(models.Venue, { foreignKey: 'venueId' });
    VenuesDrink.belongsTo(models.Drink, { foreignKey: 'drinkId' });
  };
  return VenuesDrink;
};
