const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Obtener un producto por su ID
router.get('/:id', productController.getProductById);

// Actualizar un producto
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

// Filtrar productos por stock
router.get('/filter/stock', productController.filterProductsByStock);

// Filtrar productos por categoría
router.get('/filter/category', productController.filterProductsByCategory);

// Buscar productos por la inicial de su nombre
router.get('/search/initial', productController.searchProductsByInitial);

module.exports = router;
