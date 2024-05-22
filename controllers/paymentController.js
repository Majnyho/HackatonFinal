const axios = require('axios');
require('dotenv').config();

exports.processPayment = async (req, res) => {
  const { token, amount, email } = req.body;
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
    res.status(500).json({ message: error.response.data.user_message });
  }
};

