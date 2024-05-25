const axios = require('axios');
const Order = require('../models/Order');
require('dotenv').config();

// Procesar pago
exports.processPayment = async (req, res) => {
  const { orderId, token, amount, email } = req.body;

  // Validar campos necesarios
  if (!orderId || !token || !amount || !email) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Validar que el monto sea mayor que cero
  if (amount <= 0) {
    return res.status(400).json({ message: 'El monto debe ser mayor que cero' });
  }

  try {
    // Buscar la orden en la base de datos
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: 'Orden no encontrada' });
    }

    // Realizar una solicitud POST a la API de Culqi para crear un cargo
    const response = await axios.post(
      'https://api.culqi.com/v2/charges',
      {
        amount: amount,
        currency_code: 'PEN',
        email: email,
        source_id: token
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_KEY}`
        }
      }
    );

    // Actualizar el estado de la orden a 'Pagado' y guardar
    order.status = 'Pagado';
    await order.save();

    // Responder con los datos del cargo y la orden actualizada
    res.json({ charge: response.data, order });
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json({ message: error.response.data.user_message });
    } else if (error.request) {
      res.status(500).json({ message: 'No response received from Culqi' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};
// Función para reembolsar un pago
exports.refundPayment = async (req, res) => {
  // Extrae el ID del pago y la razón del cuerpo de la solicitud
  const { chargeId, reason } = req.body;

  // Valida que el ID del pago esté presente
  if (!chargeId) {
    return res.status(400).json({ message: 'El ID del cargo es obligatorio' });
  }

  try {
    // Realiza una solicitud POST a la API de Culqi para reembolsar un pago
    const response = await axios.post(
      `https://api.culqi.com/v2/refunds`,
      {
        charge_id: chargeId,
        reason: reason || 'solicitud del cliente'
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_KEY}`
        }
      }
    );
    // Responde con los datos de la respuesta de Culqi en formato JSON
    res.json(response.data);
  } catch (error) {
    // Maneja los errores y responde con el mensaje de error adecuado
    res.status(500).json({ message: error.response.data.user_message });
  }
};

// Función para obtener el estado de un pago
exports.getPaymentStatus = async (req, res) => {
  // Extrae el ID del pago de los parámetros de la solicitud
  const { chargeId } = req.params;

  // Valida que el ID del pago esté presente
  if (!chargeId) {
    return res.status(400).json({ message: 'El ID del cargo es obligatorio' });
  }

  try {
    // Realiza una solicitud GET a la API de Culqi para obtener el estado de un pago
    const response = await axios.get(
      `https://api.culqi.com/v2/charges/${chargeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_KEY}`
        }
      }
    );
    // Responde con los datos de la respuesta de Culqi en formato JSON
    res.json(response.data);
  } catch (error) {
    // Maneja los errores y responde con el mensaje de error adecuado
    res.status(500).json({ message: error.response.data.user_message });
  }
};
