// Importa el módulo de Mongoose para manejar la conexión y las operaciones con MongoDB
const mongoose = require('mongoose');

// Carga las variables de entorno desde un archivo .env en el entorno de Node.js
require('dotenv').config();

// Define una función asincrónica para conectar a la base de datos MongoDB
const connectDB = async () => {
  try {
    // Intenta conectar a la base de datos MongoDB usando la URL de conexión almacenada en las variables de entorno
    await mongoose.connect(process.env.MONGODB_URI,);

    // Si la conexión es exitosa, imprime un mensaje en la consola
    console.log('MongoDB conectado');
  } catch (err) {
    // Si ocurre un error durante la conexión, imprime el mensaje de error en la consola
    console.error(err.message);

    // Sale del proceso de Node.js con un código de error (1)
    process.exit(1);
  }
};
// Exporta la función connectDB para que pueda ser utilizada en otros archivos del proyecto
module.exports = connectDB;
