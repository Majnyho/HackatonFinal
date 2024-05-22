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
