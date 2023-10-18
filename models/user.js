const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class User extends Model { }

User.init({
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  name: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.ENUM('Admin', 'Manager', 'Finance'),
  },
}, { sequelize, timestamps: true, modelName: 'User' });

module.exports = User;
