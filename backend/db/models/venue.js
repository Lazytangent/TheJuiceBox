"use strict";
module.exports = (sequelize, DataTypes) => {
  const Venue = sequelize.define(
    "Venue",
    {
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
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {}
  );
  Venue.associate = function (models) {
    Venue.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'creator',
    });
    Venue.belongsToMany(models.User, {
      through: { model: models.CheckIn, unique: false },
      foreignKey: "venueId",
      otherKey: "userId",
    });
    Venue.belongsToMany(models.Drink, {
      through: models.VenuesDrink,
      foreignKey: "venueId",
      otherKey: "drinkId",
    });
  };
  return Venue;
};
