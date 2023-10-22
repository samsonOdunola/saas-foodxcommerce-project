const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class OrderItem extends Model { }

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  discount: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },

}, {
  sequelize,
  timestamps: true,
  modelName: 'Order_Item',
});

module.exports = OrderItem;
