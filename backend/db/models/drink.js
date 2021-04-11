'use strict';
module.exports = (sequelize, DataTypes) => {
  const Drink = sequelize.define('Drink', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 50],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
    creatorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  }, {});
  Drink.associate = function(models) {
    Drink.belongsToMany(models.User, { through: models.DrinkReview, foreignKey: 'drinkId', otherKey: 'userId' });
    Drink.belongsToMany(models.Venue, { through: models.VenuesDrink, foreignKey: 'drinkId', otherKey: 'venueId' });
    Drink.belongsTo(models.User, { as: 'Creator', foreignKey: 'creatorId' });
    Drink.hasMany(models.DrinkReview, { as: 'Reviews', foreignKey: 'drinkId' });
  };
  return Drink;
};
