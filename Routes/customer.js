const express = require('express');
const {
  signup,
  verifyEmail,
  signin,
  addAddress,
  selectDefaultAddress,
  resetPassword,
  viewAllOrder,
  viewOrder,
  reviews,
} = require('../controllers/customer');
const { authorizeCustomer } = require('../middleware/authentication');

const router = express.Router();

router.post('/signup', signup);
router.post('/verify', verifyEmail);
router.get('/login', signin);
router.post('/address/:userId', authorizeCustomer, addAddress);
router.put('/address/:userId/:addressId', selectDefaultAddress);
router.get('/order/:userId', viewAllOrder);
router.get('/order/:userId/:orderId', viewOrder);
router.put('/password/reset/:userId', resetPassword);
router.get('/reviews/:userId', reviews);

module.exports = router;
