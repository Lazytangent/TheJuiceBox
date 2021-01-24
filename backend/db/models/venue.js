'use strict';
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define('Venue', {
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    imageUrl: DataTypes.STRING
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
  };
  return Venue;
};