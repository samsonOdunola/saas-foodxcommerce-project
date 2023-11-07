const express = require('express');
const {
  createCheckout, changeAddress, changePaymentType, changeDeliveryType,
} = require('../controllers/checkout');
const {
  showCart, addToCart, deleteCartItem, updateCartItemQty,
} = require('../controllers/cart');

const {
  generateOrder, verifyOrder,
  initiateDeliveryConfirmation, finalizeDeliveryConfirmation, confirmShipment,
} = require('../controllers/order');

const { likeProduct } = require('../controllers/inventory');

const router = express.Router();

// TODO -
// Move verify shipment route to vendor/staff route
// Move verify confirm delivery to logistics route

// checkout
router.get('/checkout/:userId', createCheckout);
router.put('/checkout/address/:userId', changeAddress);
router.put('/checkout/payment_method/:userId', changePaymentType);
router.put('/checkout/delivery_type/:userId', changeDeliveryType);

// Cart
router.get('/cart/:userId', showCart);
router.put('/cart/:userId', addToCart);
router.delete('/cart/:userId', deleteCartItem);
router.put('/cart/product/:userId', updateCartItemQty);

// order
router.post('/order/:userId', generateOrder);
router.get('/order/verify/:transactionReference', verifyOrder);
router.get('/order/verify/shipment/:transactionReference', confirmShipment);
router.post('/order/verify/delivery/:transactionReference', initiateDeliveryConfirmation);
router.put('/order/verify/delivery/:transactionReference', finalizeDeliveryConfirmation);

// Product

router.put('/product//like/:productId', likeProduct);

// Review

// router.post('/verify', verifyEmail);
// router.get('/login', signin);
// router.post('/cart/:id', addToCart);
// router.get('/cart', cart);
// router.post('/order', createOrder);
module.exports = router;
