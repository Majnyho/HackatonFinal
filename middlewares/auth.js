// Importa jsonwebtoken para verificar tokens JWT
const jwt = require('jsonwebtoken');

// Carga las variables de entorno desde un archivo .env en el entorno de Node.js
require('dotenv').config();

// Middleware de autenticación
function auth(req, res, next) {
  // Obtiene el token de la cabecera de autorización
  const token = req.header('Authorization');
  
  // Si no hay token, responde con un estado 401 (No autorizado) y un mensaje de acceso denegado
  if (!token) return res.status(401).json({ message: 'Acceso denegado' });

  try {
    // Verifica el token usando el secreto JWT desde las variables de entorno
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    
    // Asigna el payload verificado del token a req.user
    req.user = verified;
    
    // Llama a next() para pasar al siguiente middleware o ruta
    next();
  } catch (err) {
    // Si el token no es válido, responde con un estado 400 (Solicitud incorrecta) y un mensaje de token no válido
    res.status(400).json({ message: 'Token no válido' });
  }
}

// Exporta el middleware de autenticación para que pueda ser utilizado en otros archivos del proyecto
module.exports = auth;
