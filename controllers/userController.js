// Importa el modelo User desde la carpeta models
const User = require('../models/User');

// Importa bcrypt para encriptar contraseñas
const bcrypt = require('bcrypt');

// Importa jsonwebtoken para generar y verificar tokens JWT
const jwt = require('jsonwebtoken');

// Importa la función getNextId desde la carpeta utils/counterHelper
const { getNextId } = require('../utils/counterHelper');

// Registro de usuario
exports.registerUser = async (req, res) => {
  // Obtiene el próximo ID disponible para un nuevo usuario
  const userId = await getNextId('User');
  try {
    // Genera un salt para la encriptación de la contraseña
    const salt = await bcrypt.genSalt(10);
    // Encripta la contraseña proporcionada por el usuario
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Crea una nueva instancia del modelo User con los datos proporcionados
    const user = new User({
      id: userId,
      username: req.body.username,
      password: hashedPassword
    });

    // Guarda el nuevo usuario en la base de datos
    const newUser = await user.save();
    // Responde con el nuevo usuario creado y un estado 201 (creado)
    res.status(201).json(newUser);
  } catch (err) {
    // Si ocurre un error, responde con un estado 400 y un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Login de usuario
exports.loginUser = async (req, res) => {
  try {
    // Busca un usuario por su nombre de usuario
    const user = await User.findOne({ username: req.body.username });
    // Si el usuario no se encuentra, responde con un estado 400 y un mensaje de error
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    // Compara la contraseña proporcionada con la contraseña almacenada en la base de datos
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    // Si la contraseña no es válida, responde con un estado 400 y un mensaje de error
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

    // Genera un token JWT con el ID del usuario
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    // Responde con un mensaje de bienvenida y el token
    res.json({ 
      message: `Bienvenido ${user.username}`,
      token: token
    });
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Permite a un usuario obtener su propia información de perfil
exports.getUserProfile = async (req, res) => {
  try {
    // Busca al usuario por su ID y excluye la contraseña del resultado
    const user = await User.findById(req.user._id).select('-password');
    // Si el usuario no se encuentra, responde con un estado 404 y un mensaje de error
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    // Responde con la información del usuario
    res.json(user);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Permite a un usuario actualizar su propia información de perfil
exports.updateUserProfile = async (req, res) => {
  try {
    // Busca al usuario por su ID
    const user = await User.findById(req.user._id);
    // Si el usuario no se encuentra, responde con un estado 404 y un mensaje de error
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Actualiza el nombre de usuario si se proporciona uno nuevo
    user.username = req.body.username || user.username;
    // Si se proporciona una nueva contraseña, la encripta y la actualiza
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    // Guarda los cambios en la base de datos
    const updatedUser = await user.save();
    // Responde con el usuario actualizado
    res.json(updatedUser);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Permite a un usuario eliminar su propia cuenta
exports.deleteUser = async (req, res) => {
  try {
    // Busca y elimina al usuario por su ID
    const user = await User.findByIdAndDelete(req.user._id);
    // Si el usuario no se encuentra, responde con un estado 404 y un mensaje de error
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
    // Responde con un mensaje de éxito
    res.json({ message: 'Cuenta eliminada' });
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};
