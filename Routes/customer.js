const express = require('express');
const {
  signup, verifyEmail, signin, addToCart, cart, createOrder,
} = require('../controllers/customer');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verifyEmail);
router.get('/login', signin);
router.post('/cart/:id', addToCart);
router.get('/cart', cart);
router.post('/order/create/:userId', createOrder);
module.exports = router;
