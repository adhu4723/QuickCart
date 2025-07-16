const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const verifyAdmin = require('../middleware/verifyAdmin');

// Category routes
router.post('/category', verifyAdmin, categoryController.addCategory);
router.get('/categories', categoryController.getAllCategories);
router.patch('/category/:categoryId', verifyAdmin, categoryController.editCategory);
router.delete('/category/:categoryId', verifyAdmin, categoryController.deleteCategory);

// Subcategory routes
router.post('/category/:categoryId/subcategory', verifyAdmin, categoryController.addSubCategory);
router.patch('/category/:categoryId/subcategory/:subcategoryId', verifyAdmin, categoryController.editSubCategory);
router.delete('/category/:categoryId/subcategory/:subcategoryId', verifyAdmin, categoryController.deleteSubCategory);

module.exports = router;
