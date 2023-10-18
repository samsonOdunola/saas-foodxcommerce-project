const { DataTypes, Model, UUIDV4 } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Order extends Model { }

Order.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    unique: true,
    defaultValue: UUIDV4,
  },

  paymentType: {
    type: DataTypes.ENUM('Cash', 'Transfer'),
    allowNulll: false,
  },

  orderStatus: {
    type: DataTypes.ENUM('Pending', 'complete', 'cancelled', 'incomplete'),
  },
  orderDate: {
    type: DataTypes.DATEONLY,
  },
  orderNote: {
    type: DataTypes.TEXT('medium'),
  },
  subTotal: {
    type: DataTypes.INTEGER,
  },
  deliveryCost: {
    type: DataTypes.INTEGER,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Order',
});

module.exports = Order;
