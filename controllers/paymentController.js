const axios = require('axios');
require('dotenv').config();

exports.processPayment = async (req, res) => {
  const { token, amount, email } = req.body;
  if (!token || !amount || !email) {
    return res.status(400).json({ message: 'Todos los campos son obligatorios' });
  }

  if (amount <= 0) {
    return res.status(400).json({ message: 'El monto debe ser mayor que cero' });
  }

  try {
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
    res.json(response.data);
  } catch (error) {
    const statusCode = error.response ? error.response.status : 500;
    const message = error.response ? error.response.data.user_message : 'Error interno del servidor';
    res.status(statusCode).json({ message });
  }
};

exports.refundPayment = async (req, res) => {
  const { chargeId, reason } = req.body;
  if (!chargeId) {
    return res.status(400).json({ message: 'El ID del cargo es obligatorio' });
  }

  try {
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
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response.data.user_message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { chargeId } = req.params;
  if (!chargeId) {
    return res.status(400).json({ message: 'El ID del cargo es obligatorio' });
  }

  try {
    const response = await axios.get(
      `https://api.culqi.com/v2/charges/${chargeId}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.CULQI_PRIVATE_KEY}`
        }
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.response.data.user_message });
  }
};
