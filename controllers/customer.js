const crypto = require('crypto');
const Customer = require('../models/customer');
const Cart = require('../models/cart');
const Order = require('../models/order');
const { hashPassword, comparePassword } = require('../utils/hashPassword');
const sendMail = require('../utils/email');
const { signUser } = require('../utils/authorisation');
const response = require('../utils/response');

require('dotenv').config();

const signup = async (req, res) => {
  let user;
  try {
    const {
      name, email, phoneNumber, password,
    } = req.body;
    const passwordHash = await hashPassword(password);
    const token = crypto.randomBytes(32).toString('hex');

    user = await Customer.create({
      name, email, phoneNumber, password: passwordHash, verificationToken: token,
    });
    const emailResult = await sendMail(email, token);
    console.log(emailResult);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating Resource', error: err.message, data: {},
    });
  }
  return res.status(response.CREATED).json({ success: true, message: 'Signup Successfull', data: user });
};

const verifyEmail = async (req, res) => {
  let user;
  try {
    const { token, email } = req.query;

    user = await Customer.findOne({ where: { email } });

    if (user.verificationToken === token) {
      await user.update({ verified: true });
    } else {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Verification failed', error: 'Wrong/Expired token', data: {},
      });
    }
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in verifying Resource', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({ success: true, message: 'Verification Successfull', data: user });
};

const signin = async (req, res) => {
  let user;
  let token;

  try {
    const { email, password } = req.body;
    user = await Customer.findOne({ where: { email } });
    if (user === null) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Error in Logging In User', error: 'User Not found', data: {},
      });
    }
    if (!user.verified) {
      return res.status(response.BAD_REQUEST).json({
        success: false, message: 'Verify your Email before logging In', error: 'User Not verified', data: {},
      });
    }
    const correctPassword = await comparePassword(password, user.password);

    if (!correctPassword) {
      return res.status(response.NOT_FOUND).json({
        success: false, message: 'Incorrect User Name or password', error: 'User Not found', data: {},
      });
    }

    token = await signUser(user);
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in logging in User', error: err.message, data: {},
    });
  }

  return res.status(response.OK).json({
    success: true, message: 'success', data: user, token,
  });
};
const addToCart = async (req, res) => {
  let cart = null;

  try {
    // retrieve customer PK from request using query incase there is a guest user without an id
    const { item } = req.query;
    const { id } = req.params;
    // retrive item to be inserted into cart from request
    if (id) { // guest user will not have a user id
      cart = await Cart.findOne({ where: { CustomerId: id } });
      if (cart) { // if user has a cart
        await cart.addProduct(item);
      } else {
        cart = await Cart.create({ CustomerId: id });
        await cart.addProduct(item);
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
const cart = async (req, res) => {
  let userCart = null;
  let productList = [];
  try {
    const { userId } = req.query;

    userCart = await Cart.findOne({ where: { CustomerId: userId } });
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
const createOrder = async (req, res) => {
  let order;
  try {
    let subTotal = 0.0;
    const tax = 0.0;
    const shipping = 0.0;
    const orderDiscount = 0.0;
    let grandTotal = 0.0;
    const { userId } = req.params;
    const { data } = req.body;
    const user = await Customer.findByPk(userId);
    data.map((product) => {
      // eslint-disable-next-line camelcase
      const { sellingPrice, Cart_Item, discount } = product;
      // eslint-disable-next-line camelcase
      const { quantity } = Cart_Item;
      subTotal += ((sellingPrice * quantity) - discount);
    });

    grandTotal = subTotal + tax + shipping - orderDiscount;

    order = await Order.create({
      CustomerId: user.id,
      subTotal,
      tax,
      shipping,
      discount: orderDiscount,
      grandTotal,
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phoneNumber,
    });
    data.map(async (product) => {
      // eslint-disable-next-line camelcase
      const { id, Cart_Item } = product;
      // eslint-disable-next-line camelcase
      console.log(Cart_Item.quantity);

      // eslint-disable-next-line camelcase
      await order.addProducts(id, { through: { quantity: Cart_Item.quantity } });
    });
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Error in creating order', error: err.message, data: {},
    });
  }
  return res.status(response.OK).json({
    success: true, message: 'Order Created', data: order,
  });
};
module.exports = {
  signup, verifyEmail, signin, addToCart, cart, createOrder,
};
