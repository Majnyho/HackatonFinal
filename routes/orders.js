const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

// Obtener las compras del usuario
router.get('/', auth, orderController.getUserOrders);

module.exports = router;
