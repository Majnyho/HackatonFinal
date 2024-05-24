const Product = require('../models/Product');
const { getNextId } = require('../utils/counterHelper');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  const productId = await getNextId('Product');
  const product = new Product({
    id: productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  });

  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filtrar productos por stock
exports.filterProductsByStock = async (req, res) => {
  try {
    const inStock = req.query.inStock === 'true';
    const products = await Product.find({ stock: inStock ? { $gt: 0 } : 0 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Filtrar productos por categoría
exports.filterProductsByCategory = async (req, res) => {
  try {
    const category = req.query.category;
    const products = await Product.find({ category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Buscar productos por la inicial de su nombre
exports.searchProductsByInitial = async (req, res) => {
  try {
    const initial = req.query.initial;
    if (!initial) {
      return res.status(400).json({ message: 'La inicial es requerida' });
    }
    const regex = new RegExp(`^${initial}`, 'i'); // Expresión regular para buscar por inicial
    const products = await Product.find({ name: { $regex: regex } });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
