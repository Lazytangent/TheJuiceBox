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
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING
    },
  }, {});
  Venue.associate = function(models) {
    // associations can be defined here
  };
  return Venue;
};
