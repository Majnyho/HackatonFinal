const Culqi = require('culqi-node');
require('dotenv').config();

const culqi = new Culqi({ privateKey: process.env.CULQI_PRIVATE_KEY });

const testPayment = async () => {
  try {
    const charge = await culqi.charges.create({
      amount: 1000,
      currency_code: 'PEN',
      email: 'cliente@example.com',
      source_id: 'tok_test_visa_123456789'
    });
    console.log('Charge successful:', charge);
  } catch (error) {
    console.error('Error creating charge:', error);
  }
};

testPayment();
