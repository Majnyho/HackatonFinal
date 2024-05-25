// Importa el módulo mongoose para manejar la conexión y las operaciones con MongoDB
const mongoose = require('mongoose');

// Define el esquema del contador
const CounterSchema = new mongoose.Schema({
  // Define un campo 'model' de tipo String, requerido y único
  model: {
    type: String,
    required: true,
    unique: true
  },
  // Define un campo 'count' de tipo Number, con un valor predeterminado de 0
  count: {
    type: Number,
    default: 0
  }
});

// Exporta el modelo 'Counter' basado en el esquema definido
module.exports = mongoose.model('Counter', CounterSchema);
