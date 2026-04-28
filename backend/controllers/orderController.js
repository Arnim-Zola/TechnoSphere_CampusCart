const Order = require("../models/Order");

// CREATE
const createOrder = async (req, res) => {
  try {
    console.log("createOrder payload:", req.body);

    const {
      user = "student",
      stationeryItems = [],
      documents = [],
      totalAmount = 0,
      paymentMethod = "UPI",
      status = "pending",
    } = req.body;

    const count = await Order.countDocuments();
    const orderNumber = "OD-" + (1001 + count);

    const order = new Order({
      user,
      stationeryItems,
      documents,
      totalAmount,
      paymentMethod,
      orderNumber,
      status: status || "pending",
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE STATUS
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };
