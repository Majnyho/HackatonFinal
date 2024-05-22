const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Procesar pago
router.post('/pay', paymentController.processPayment);

module.exports = router;
