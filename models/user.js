'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  User.associate = function (models) {
    User.hasMany(models.Address, { as: 'addresses', foreignKey: 'userId' });
  };
  return User;
};