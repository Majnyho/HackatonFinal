const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');

// Obtener las compras del usuario
router.get('/', auth, orderController.getUserOrders);

// Crear una nueva orden
router.post('/', auth, orderController.createOrder);

// Actualizar el estado de una orden
router.put('/:id/status', auth, orderController.updateOrderStatus);

// Eliminar una orden
router.delete('/:id', auth, orderController.deleteOrder);

// Obtener una orden por su ID
router.get('/:id', auth, orderController.getOrderById);

// Obtener todas las órdenes (para administrador)
router.get('/all', auth, orderController.getAllOrders);

module.exports = router;
