const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middlewares/auth');

// Registro de usuario
router.post('/register', userController.registerUser);

// Login de usuario
router.post('/login', userController.loginUser);

// Obtener información del usuario
router.get('/profile', auth, userController.getUserProfile);

// Actualizar información del usuario
router.put('/profile', auth, userController.updateUserProfile);

// Eliminar usuario
router.delete('/profile', auth, userController.deleteUser);

module.exports = router;
