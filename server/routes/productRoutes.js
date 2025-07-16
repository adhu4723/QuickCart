const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middleware/upload');

// Create product
router.post('/', upload.array('images', 5), productController.createProduct);

// Get all products
router.get('/', productController.getAllProducts);

// Get single product
router.get('/:productId', productController.getProductById);

// Update product
router.put('/:productId', productController.updateProduct);

// Delete product
router.delete('/:productId', productController.deleteProduct);

module.exports = router;
