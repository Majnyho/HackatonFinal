const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Crear un nuevo producto
router.post('/', productController.createProduct);

module.exports = router;
