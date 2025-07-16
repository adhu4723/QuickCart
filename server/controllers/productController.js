const Product = require('../models/Product');
const Category = require('../models/Category');

// Create Product
exports.createProduct = async (req, res) => {
  try {
    console.log('Files received:', req.files);
    const {
      name,
      description,
      price,
      stock,
      category,
      subcategory,
      isFeatured,
    } = req.body;

    const imagePaths = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);

    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return res.status(400).json({ error: 'Invalid category ID' });

    const newProduct = new Product({
      name,
      description,
      price,
      images: imagePaths,
      stock,
      category,
      subcategory,
      isFeatured,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create product', details: err.message });
  }
};


// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('category').populate('reviews.user');
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

// Get Single Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('category').populate('reviews.user');
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch product' });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.productId,
      { $set: req.body },
      { new: true }
    );
    if (!updatedProduct) return res.status(404).json({ error: 'Product not found' });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update product' });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.productId);
    if (!deleted) return res.status(404).json({ error: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
};
