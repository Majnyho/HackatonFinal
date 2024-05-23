const Order = require('../models/Order');
const { getNextId } = require('../utils/counterHelper');

// Obtener las compras del usuario
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crear una nueva orden
exports.createOrder = async (req, res) => {
  const orderId = await getNextId('Order');
  const order = new Order({
    id: orderId,
    user: req.user._id,
    products: req.body.products,
    totalAmount: req.body.totalAmount,
    status: req.body.status
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Actualizar el estado de una orden
exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    order.status = req.body.status;
    await order.save();

    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Eliminar una orden
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    await order.remove();
    res.json({ message: 'Orden eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Obtener una orden por su ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('products.product');
    if (!order) return res.status(404).json({ message: 'Orden no encontrada' });

    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
// Obtener todas las órdenes
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('user').populate('products.product');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
