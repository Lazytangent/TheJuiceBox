'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    state: {
      type: DataTypes.STRING,
    },
    lat: {
      type: DataTypes.DECIMAL,
    },
    lng: {
      type: DataTypes.DECIMAL,
    }
  }, {});
  Venue.associate = function(models) {
    Venue.belongsToMany(models.User, { through: 'CheckIns', foreignKey: 'venueId', otherKey: 'userId' });
    Venue.belongsToMany(models.Drink, { through: 'VenuesDrinks', foreignKey: 'venueId', otherKey: 'drinkId' });
  };
  return Venue;
};
