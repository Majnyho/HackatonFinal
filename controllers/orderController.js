// Importa el modelo Order desde la carpeta models
const Order = require('../models/Order');

// Importa la función getNextId desde la carpeta utils/counterHelper
const { getNextId } = require('../utils/counterHelper');

// Obtener las compras del usuario
exports.getUserOrders = async (req, res) => {
  try {
    // Busca todas las órdenes del usuario que ha iniciado sesión
    const orders = await Order.find({ user: req.user._id });
    // Responde con las órdenes en formato JSON
    res.json(orders);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  // Obtiene el próximo ID disponible para una nueva orden
  const orderId = await getNextId('Order');
  // Crea una nueva instancia del modelo Order con los datos proporcionados
  const order = new Order({
    id: orderId,
    user: req.user._id,
    products: req.body.products,
    totalAmount: req.body.totalAmount,
    status: req.body.status
  });

  try {
    // Guarda la nueva orden en la base de datos
    const newOrder = await order.save();
    // Responde con la nueva orden creada y un estado 201 (creado)
    res.status(201).json(newOrder);
  } catch (err) {
    // Si ocurre un error, responde con un estado 400 y un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Actualizar el estado de una orden
exports.updateOrderStatus = async (req, res) => {
  try {
    // Busca la orden por su ID
    const order = await Order.findById(req.params.id);
    // Si la orden no se encuentra, responde con un estado 404 y un mensaje de error
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    // Actualiza el estado de la orden
    order.status = req.body.status;
    // Guarda los cambios en la base de datos
    await order.save();

    // Responde con la orden actualizada
    res.json(order);
  } catch (err) {
    // Si ocurre un error, responde con un estado 400 y un mensaje de error
    res.status(400).json({ message: err.message });
  }
};

// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  try {
    // Busca la orden por su ID
    const order = await Order.findById(req.params.id);
    // Si la orden no se encuentra, responde con un estado 404 y un mensaje de error
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    // Elimina la orden de la base de datos
    await order.remove();
    // Responde con un mensaje de éxito
    res.json({ message: 'Orden eliminada' });
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Obtener una orden por su ID
exports.getOrderById = async (req, res) => {
  try {
    // Busca la orden por su ID y muestra los productos dentro de la orden
    const order = await Order.findById(req.params.id).populate('products.product');
    // Si la orden no se encuentra, responde con un estado 404 y un mensaje de error
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    // Responde con la orden encontrada
    res.json(order);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};

// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    // Busca todas las órdenes y popula los usuarios y productos dentro de las órdenes
    const orders = await Order.find().populate('user').populate('products.product');
    // Responde con todas las órdenes encontradas
    res.json(orders);
  } catch (err) {
    // Si ocurre un error, responde con un estado 500 y un mensaje de error
    res.status(500).json({ message: err.message });
  }
};
