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
      isNotified: false,
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
    console.log("updateOrderStatus called", { id: req.params.id, status });

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    order.status = status;
    if (status === "ready") {
      order.isNotified = false;
    }

    const updatedOrder = await order.save();
    console.log("order status updated", updatedOrder);
    res.json(updatedOrder);
  } catch (error) {
    console.error("updateOrderStatus error", error);
    res.status(500).json({ error: error.message });
  }
};

const getOrderNotifications = async (req, res) => {
  try {
    const orders = await Order.find({
      status: "ready",
      isNotified: false,
    }).sort({ createdAt: -1 });
    console.log("getOrderNotifications returned", orders.length, "orders");
    res.json(orders);
  } catch (error) {
    console.error("getOrderNotifications error", error);
    res.status(500).json({ error: error.message });
  }
};

const markOrderNotified = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { isNotified: true },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus, getOrderNotifications, markOrderNotified }; 
