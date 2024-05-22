const Culqi = require('culqi-node');
require('dotenv').config();

const culqi = new Culqi({ privateKey: process.env.CULQI_PRIVATE_KEY });

exports.processPayment = async (req, res) => {
  const { token, amount, email } = req.body;
  try {
    const charge = await culqi.charge.create({
      amount,
      currency_code: 'PEN',
      email,
      source_id: token
    });
    res.json(charge);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
