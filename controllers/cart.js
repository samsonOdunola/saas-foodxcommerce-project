const response = require('../utils/response');
const Cart = require('../models/cart');
const CartItem = require('../models/cart_item');
const Product = require('../models/product');

// TODO
// Fix  potential issue with new cart and old cart

const addToCart = async (req, res) => {
  let cart = null;

  try {
    // retrieve customer PK from request using query incase there is a guest user without an id
    const { productId } = req.query;
    const { userId } = req.params;
    // retrive item to be inserted into cart from request
    if (userId) { // guest user will not have a user id
      cart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' } });
      if (cart) { // if user has a cart
        await cart.addProduct(productId);
      } else {
        cart = await Cart.create({ CustomerId: userId });
        await cart.addProduct(productId);
      }
    } else { // cart for guest user

    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Item not added to Cart', error: err, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Item added to cart', data: cart,
  });
};
const showCart = async (req, res) => {
  let userCart = null;
  let productList = [];
  try {
    const { userId } = req.params;

    userCart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' } });
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.NOT_FOUND).json({
      success: false, message: 'Error in retrieving cart Items', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Cart Items retrieved', data: productList,
  });
};

const deleteCartItem = async (req, res) => {
  let userCart;
  let productList = [];
  try {
    const { userId } = req.params;
    const { productId } = req.query;

    userCart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' } });
    await userCart.removeProduct(productId);
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.NOT_FOUND).json({
      success: false, message: 'Error in deleting cart Item', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Cart Items retrieved', data: productList,
  });
};

const updateCartItemQty = async (req, res) => {
  let userCart;
  let productList = [];
  try {
    const { userId } = req.params;
    const { productId, action } = req.query;

    if (action === 'INCREMENT') {
      userCart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' } });
      await CartItem.increment(
        { quantity: 1 },
        { where: { CartId: userCart.id, ProductId: productId } },
      );
    } else if (action === 'DECREMENT') {
      userCart = await Cart.findOne({ where: { CustomerId: userId, status: 'New' }, include: Product });
      const cartitem = await CartItem.findOne({
        where: {
          CartId: userCart.id,
          ProductId: productId,
        },
      });
      if (cartitem.quantity > 1) {
        await CartItem.decrement(
          { quantity: 1 },
          { where: { CartId: userCart.id, ProductId: productId } },
        );
      }
    }
    productList = await userCart.getProducts({ attributes: ['title', 'id', 'sellingPrice', 'discount', 'image'] });
  } catch (err) {
    return res.status(response.NOT_FOUND).json({
      success: false, message: 'Error in incementing Item count', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'quantity update sucessfull', data: productList,
  });
};

module.exports = {
  showCart, addToCart, deleteCartItem, updateCartItemQty,
};
