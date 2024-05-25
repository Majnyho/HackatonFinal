// Importa el módulo Culqi para interactuar con la API de Culqi
const Culqi = require('culqi-node');

// Carga las variables de entorno desde un archivo .env en el entorno de Node.js
require('dotenv').config();

// Crea una instancia de Culqi con la clave privada obtenida de las variables de entorno
const culqi = new Culqi({ privateKey: process.env.CULQI_PRIVATE_KEY });

// Función asincrónica para probar el procesamiento de un pago
const testPayment = async () => {
  try {
    // Crea un cargo en Culqi utilizando los datos proporcionados
    const charge = await culqi.charges.create({
      amount: 1000, // Monto del cargo en céntimos (10.00 PEN)
      currency_code: 'PEN', // Código de la moneda (Soles peruanos)
      email: 'cliente@example.com', // Correo electrónico del cliente
      source_id: 'tok_test_visa_123456789' // ID de la fuente del token (tarjeta de prueba)
    });
    // Si el cargo se crea con éxito, imprime los detalles del cargo en la consola
    console.log('Charge successful:', charge);
  } catch (error) {
    // Si ocurre un error, imprime el mensaje de error en la consola
    console.error('Error creating charge:', error);
  }
};

// Llama a la función testPayment para ejecutar la prueba del pago
testPayment();
