const express = require('express');

const router = express.Router();
const {
  getAllProducts, getProductbyId, addNewInventoryItem, deleteInventoryItem, modifyProduct,
} = require('../controllers/inventory');

// Inventory
router.post('/product', addNewInventoryItem);
router.get('/product/:productId', getProductbyId);
router.get('/all', getAllProducts);
router.delete('/product/:productId', deleteInventoryItem);
router.put('/product/:productId', modifyProduct);

module.exports = router;
