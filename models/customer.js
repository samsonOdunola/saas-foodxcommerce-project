const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Customer extends Model { }

Customer.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,

  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNulll: false,
    unique: true,
  },
  number: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  billingAddress: {
    type: DataTypes.STRING,
  },
  verified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Customer',
});

module.exports = Customer;
