const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Cart extends Model { }

Cart.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
  },

  quantity: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Cart',
});

module.exports = Cart;
