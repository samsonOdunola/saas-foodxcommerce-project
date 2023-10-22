const Customer = require('../models/customer');
const Cart = require('../models/cart');
const Order = require('../models/order');
const Product = require('../models/product');
const CartItem = require('../models/cart_item');
const Category = require('../models/category');
const OrderItem = require('../models/order_item');
const ProductCategory = require('../models/product_category');
const ProductImage = require('../models/product_images');
const ProductReview = require('../models/product_review');
const PromoCode = require('../models/promoCode');
const Transaction = require('../models/transaction');

const syncDb = () => {
  // Define Customer Associations
  Customer.hasMany(Order);
  Order.belongsTo(Customer);
  Customer.hasMany(Cart);
  Cart.belongsTo(Customer);
  Customer.hasMany(Transaction);
  Transaction.belongsTo(Customer);
  Customer.hasMany(ProductReview);
  ProductReview.belongsTo(Customer);

  // Define Promo code association
  PromoCode.hasMany(Order);

  // Define order associations
  Order.belongsToMany(Product, { through: OrderItem });
  Order.hasMany(Transaction);
  Order.belongsTo(PromoCode);

  // Define Transaction associations
  Transaction.belongsTo(Order);

  // Define Product associations
  Product.belongsToMany(Order, { through: OrderItem });
  Product.belongsToMany(Cart, { through: CartItem });

  Product.hasMany(ProductReview);
  ProductReview.belongsTo(Product);

  Product.hasMany(ProductImage);
  ProductImage.belongsTo(Product);

  Product.belongsToMany(Category, { through: ProductCategory });
  Category.belongsToMany(Product, { through: ProductCategory });

  // Define Cart Association
  Cart.belongsToMany(Product, { through: CartItem, uniqueKey: false });
};

module.exports = syncDb;
