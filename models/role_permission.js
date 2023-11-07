const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/mysql.config');

class RolePermission extends Model { }

RolePermission.init({
  resource: {
    type: DataTypes.ENUM('ALL', 'CUSTOMER'),
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'role_permisison',
  timestamps: true,
});

module.exports = RolePermission;
