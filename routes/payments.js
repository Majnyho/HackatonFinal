const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Procesar pago
router.post('/pay', paymentController.processPayment);

// Reembolsar pago
router.post('/refund', paymentController.refundPayment);

// Verificar estado de pago
router.get('/status/:chargeId', paymentController.getPaymentStatus);

module.exports = router;
