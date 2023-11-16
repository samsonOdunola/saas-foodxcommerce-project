const express = require('express');

const router = express.Router();
const {
  getAllProducts, getProductbyId, addNewInventoryItem, deleteInventoryItem, modifyProduct,
} = require('../controllers/inventory');
const productAccess = require('../middleware/inventoryAuthorisation');

// Inventory
router.post('/product', productAccess.createProduct, addNewInventoryItem);
router.get('/product/:productId', getProductbyId);
router.get('/all', getAllProducts);
router.delete('/product/:productId', productAccess.deleteAnyProduct, deleteInventoryItem);
router.put('/product/:productId', productAccess.updateAnyProduct, modifyProduct);

module.exports = router;
