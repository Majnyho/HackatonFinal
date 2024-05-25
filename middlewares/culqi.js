// Importa el módulo Culqi para interactuar con la API de Culqi
const Culqi = require('culqi-node');

// Carga las variables de entorno desde un archivo .env en el entorno de Node.js
require('dotenv').config();

// Crea una instancia de Culqi con la clave privada obtenida de las variables de entorno
const culqi = new Culqi({ privateKey: process.env.CULQI_PRIVATE_KEY });

// Función para procesar un pago
exports.processPayment = async (req, res) => {
  // Extrae el token, el monto y el correo electrónico del cuerpo de la solicitud
  const { token, amount, email } = req.body;

  try {
    // Crea un cargo en Culqi utilizando los datos proporcionados
    const charge = await culqi.charge.create({
      amount,
      currency_code: 'PEN',
      email,
      source_id: token
    });
    // Responde con los datos del cargo creado en formato JSON
    res.json(charge);
  } catch (error) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: error.message });
  }
};
