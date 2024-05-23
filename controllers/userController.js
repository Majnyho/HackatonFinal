const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getNextId } = require('../utils/counterHelper');

// Registro de usuario
exports.registerUser = async (req, res) => {
  const userId = await getNextId('User');
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
      id: userId,
      username: req.body.username,
      password: hashedPassword
    });

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// Login de usuario
exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(400).json({ message: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
    
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
