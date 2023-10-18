const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Inventory extends Model { }

Inventory.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  sellingPrice: {
    type: DataTypes.INTEGER,
  },
  costPrice: {
    type: DataTypes.INTEGER,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  longDescription: {
    type: DataTypes.STRING,
  },
  expiryDate: {
    type: DataTypes.DATE,
  },
  image: {
    type: DataTypes.STRING,
  },
  orders: {
    type: DataTypes.INTEGER,
  },
  views: {
    type: DataTypes.INTEGER,
  },
  rating: {
    type: DataTypes.INTEGER,

  },
  likes: {
    type: DataTypes.INTEGER,
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Inventory',
});

module.exports = Inventory;
