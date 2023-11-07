const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Permissions extends Model { }

Permissions.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.ENUM('READ', 'WRITE', 'DELETE', 'UPDATE'),
    allowNull: false,
  },

}, {
  sequelize,
  modelName: 'Permissions',
  timestamps: true,
});

module.exports = Permissions;
