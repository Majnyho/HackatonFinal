// Importa el módulo axios para realizar solicitudes HTTP
const axios = require('axios');

// Carga las variables de entorno desde un archivo .env en el entorno de Node.js
require('dotenv').config();

// Procesar pago
exports.processPayment = async (req, res) => {
  // Extrae el token, el monto y el correo electrónico del cuerpo de la solicitud
  const { token, amount, email } = req.body;

  // Valida que todos los campos requeridos estén presentes
  if (!token || !amount || !email) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  // Valida que el monto sea mayor que cero
  if (amount <= 0) {
    return res.status(400).json({ message: 'El monto debe ser mayor que cero' });
  }

  try {
    // Realiza una solicitud POST a la API de Culqi para crear un cargo
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
    // Responde con los datos de la respuesta de Culqi en formato JSON
    res.json(response.data);
  } catch (error) {
    // Maneja los errores y responde con el mensaje de error adecuado
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.user_message : 'Error interno del servidor';
    res.status(statusCode).json({ message });
  }
};

// Reembolso de pago
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

// Estado de pago
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
