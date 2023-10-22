const crypto = require('crypto');
const Customer = require('../models/customer');
const Cart = require('../models/cart');
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

    user = await Customer.findByPk(email);

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
    const { email, item } = req.params;
    // retrive item to be inserted into cart from request
    if (email) {
      const user = await Customer.findByPk(email);
      cart = await Cart.findByPk(user.cart_id);
      if (cart) {
        await Cart.update({ inventory_id: item }, {
          where: {
            customer_id: email,
          },
        });
        await cart.increment({ quantity: 1 }, {
          where: {
            customer_id: email,
          },
        });
        cart = await Cart.findByPk(user.cart_id);
        return res.status(response.OK).json({ success: true, message: 'Cart update Successfull', data: cart });
      }
      // const newCart = await Cart.create({ inventory_id: item, quantity: 1, customer_id: email });

      await Cart.create();
    }
    // use Id to pull out customer cart information
    // if there is no open cart i.e cart that has not be converted to order then create a new cart
    // if there is an open cart retrieve the id of the cart
    // update cart with item and set quantity to one
    // return success back to customer
  } catch (err) {
    return res.status(response.BAD_REQUEST).json({
      success: false, message: 'Item not added to Cart', error: err.message, data: {},
    });
  }
};
module.exports = {
  signup, verifyEmail, signin, addToCart,
};
