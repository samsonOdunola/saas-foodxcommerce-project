const Customer = require('../models/customer');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Inventory = require('../models/inventory');
const Review = require('../models/reviews');

const syncDb = () => {
  Customer.hasOne(Cart, { foreignKey: 'customer_id' });
  Cart.hasOne(Customer, { foreignKey: 'cart_id' });
  Cart.belongsTo(Customer, { foreignKey: 'customer_id' });

  Order.hasOne(Customer, { foreignKey: 'order_id' });
  Customer.hasMany(Order, { foreignKey: 'customer_id' });
  Inventory.hasMany(Order, { foreignKey: 'inventory_id' });
  Inventory.hasMany(Cart, { foreignKey: 'inventory_id' });
  // Review Association
  Review.hasOne(Inventory, { foreignKey: 'review_id' });
  Inventory.hasOne(Review, { foreignKey: 'inventory_id' });
};

module.exports = syncDb;
