'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const Address = sequelize.define('Address', {
    street: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zip: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });
  Address.associate = function (models) {
    Address.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };
  return Address;
};
