const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Order extends Model { }

Order.init({
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: false,
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,

  },
  status: {
    type: DataTypes.ENUM('New', 'Checkout', 'Paid', 'Failed', 'Shipped', 'Delivered', 'Returned', 'Complete'),
  },
  note: {
    type: DataTypes.TEXT('medium'),
    allowNull: true,
  },
  tax: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  shipping: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  grandTotal: {
    type: DataTypes.FLOAT,
    allowNull: false,
    defaultValue: 0,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  country: {
    type: DataTypes.STRING,
    allowNull: true,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Order',
});

module.exports = Order;
