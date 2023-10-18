const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class Review extends Model { }

Review.init({
  id: {
    primaryKey: true,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    unique: true,
  },
  review: {
    type: DataTypes.TEXT('long'),
  },
}, {
  sequelize,
  timestamps: true,
  modelName: 'Review',
});

module.exports = Review;
