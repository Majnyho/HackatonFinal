// Importa el modelo Product desde la carpeta models
const Product = require('../models/Product');

// Importa la función getNextId desde la carpeta utils/counterHelper
const { getNextId } = require('../utils/counterHelper');

// Obtener todos los productos
exports.getAllProducts = async (req, res) => {
  try {
    // Busca todos los productos en la base de datos
    const products = await Product.find();
    // Responde con los productos encontrados en formato JSON
    res.json(products);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Crear un nuevo producto
exports.createProduct = async (req, res) => {
  // Obtiene el próximo ID disponible para un nuevo producto
  const productId = await getNextId('Product');
  // Crea una nueva instancia del modelo Product con los datos proporcionados
  const product = new Product({
    id: productId,
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    stock: req.body.stock
  });

  try {
    // Guarda el nuevo producto en la base de datos
    const newProduct = await product.save();
    // Responde con el nuevo producto creado y un estado 201 (creado)
    res.status(201).json(newProduct);
  } catch (err) {
    // Si ocurre un error, responde con un estado 400 y un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Obtener un producto por su ID
exports.getProductById = async (req, res) => {
  try {
    // Busca el producto por su ID
    const product = await Product.findById(req.params.id);
    // Si el producto no se encuentra, responde con un estado 404 y un mensaje de error
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    // Responde con el producto encontrado
    res.json(product);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un producto
exports.updateProduct = async (req, res) => {
  try {
    // Busca el producto por su ID
    const product = await Product.findById(req.params.id);
    // Si el producto no se encuentra, responde con un estado 404 y un mensaje de error
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });

    // Actualiza los campos del producto con los datos proporcionados
    product.name = req.body.name || product.name;
    product.description = req.body.description || product.description;
    product.price = req.body.price || product.price;
    product.category = req.body.category || product.category;
    product.stock = req.body.stock || product.stock;

    // Guarda los cambios en la base de datos
    const updatedProduct = await product.save();
    // Responde con el producto actualizado
    res.json(updatedProduct);
  } catch (err) {
    // Si ocurre un error, responde con un estado 400 y un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un producto
exports.deleteProduct = async (req, res) => {
  try {
    // Busca el producto por su ID y lo elimina de la base de datos
    const product = await Product.findByIdAndDelete(req.params.id);
    // Si el producto no se encuentra, responde con un estado 404 y un mensaje de error
    if (!product) return res.status(404).json({ message: 'Producto no encontrado' });
    // Responde con un mensaje de éxito
    res.json({ message: 'Producto eliminado' });
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Filtrar productos por stock
exports.filterProductsByStock = async (req, res) => {
  try {
    // Determina si el filtro de stock está activado o no
    const inStock = req.query.inStock === 'true';
    // Busca productos que estén en stock (stock > 0) o fuera de stock (stock = 0)
    const products = await Product.find({ stock: inStock ? { $gt: 0 } : 0 });
    // Responde con los productos filtrados
    res.json(products);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Filtrar productos por categoría
exports.filterProductsByCategory = async (req, res) => {
  try {
    // Obtiene la categoría del producto desde los parámetros de consulta
    const category = req.query.category;
    // Busca productos que coincidan con la categoría proporcionada
    const products = await Product.find({ category });
    // Responde con los productos filtrados
    res.json(products);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Buscar productos por la inicial de su nombre
exports.searchProductsByInitial = async (req, res) => {
  try {
    // Obtiene la inicial desde los parámetros de consulta
    const initial = req.query.initial;
    // Si la inicial no está presente, responde con un estado 400 y un mensaje de error
    if (!initial) {
      return res.status(400).json({ message: 'La inicial es requerida' });
    }
    // Crea una expresión regular para buscar productos cuyo nombre comience con la inicial (sin distinción de mayúsculas/minúsculas)
    const regex = new RegExp(`^${initial}`, 'i');
    // Busca productos que coincidan con la expresión regular
    const products = await Product.find({ name: { $regex: regex } });
    // Responde con los productos encontrados
    res.json(products);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};
