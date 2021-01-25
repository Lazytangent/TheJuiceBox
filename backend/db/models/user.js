'use strict';
const { Validator } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4, 30],
        isNotEmail(value) {
          if (Validator.isEmail(value)) {
            throw new Error('Cannot be an email.');
          }
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3, 256]
      }
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [60, 60]
      },
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: true,
        isTwentyOne(value) {
          const currentDate = new Date();
          const inputDate = new Date(value);
          if (currentDate - inputDate < 662774400000) {
            throw new Error('Cannout be under 21.');
          };
        },
      }
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['hashedPassword', 'email', 'createdAt', 'updatedAt'],
      },
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ['hashedPassword'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  User.prototype.toSafeObject = function() {
    const { id, username, email } = this;
    return { id, username, email };
  };
  User.prototype.validatePassword = function(password) {
    return bcrypt.compareSync(password, this.hashedPassword.toString());
  };
  User.getCurrentUserById = async function(id) {
    return await User.scope('currentUser').findByPk(id);
  };
  User.login = async function({ credential, password }) {
    const { Op } = require('sequelize');
    const user = await User.scope('loginUser').findOne({
      where: {
        [Op.or]: {
          username: credential,
          email: credential,
        },
      },
    });
    if (user && user.validatePassword(password)) {
      return await User.scope('currentUser').findByPk(user.id);
    }
  };
  User.signup = async function({ username, email, password, dateOfBirth }) {
    const hashedPassword = bcrypt.hashSync(password);
    const user = await User.create({
      username,
      email,
      hashedPassword,
      dateOfBirth,
    });
    return await User.scope('currentUser').findByPk(user.id);
  };
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Drink, { through: 'DrinkReviews', foreignKey: 'userId', otherKey: 'drinkId' });
    User.belongsToMany(models.Venue, { through: 'CheckIns', foreignKey: 'userId', otherKey: 'venueId' });
  };
  return User;
};
