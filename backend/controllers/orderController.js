const Order = require("../models/Order");

// ──────────────────────────────────────────────────────────────────────────
// POST /api/orders
// Creates a new order. Expects JWT-authenticated user (req.user set by auth middleware).
// ──────────────────────────────────────────────────────────────────────────
const createOrder = async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      pickupSlot,
      paymentMethod,
      transactionId,
    } = req.body;

    // Basic validation
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: "No items in order." });
    }
    if (!pickupSlot) {
      return res.status(400).json({ success: false, message: "Pick-up slot is required." });
    }
    if (!paymentMethod) {
      return res.status(400).json({ success: false, message: "Payment method is required." });
    }

    // Recalculate total on server side to prevent tampering
    const serverTotal = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      userId: req.user._id,
      items,
      totalAmount: serverTotal,
      pickupSlot,
      paymentMethod,
      transactionId: transactionId || null,
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully.",
      order,
    });
  } catch (err) {
    console.error("createOrder error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

// ──────────────────────────────────────────────────────────────────────────
// GET /api/orders/my
// Returns all orders for the logged-in student, newest first.
// ──────────────────────────────────────────────────────────────────────────
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getMyOrders error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// ──────────────────────────────────────────────────────────────────────────
// GET /api/orders/:id
// Returns a single order (student can only see their own).
// ──────────────────────────────────────────────────────────────────────────
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    // Ensure ownership
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Access denied." });
    }
    return res.status(200).json({ success: true, order });
  } catch (err) {
    console.error("getOrderById error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// ──────────────────────────────────────────────────────────────────────────
// PATCH /api/orders/:id/status   (Admin only)
// Library staff update: Pending → Processing → Ready → Collected
// ──────────────────────────────────────────────────────────────────────────
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Pending", "Processing", "Ready", "Collected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: "Invalid status." });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found." });
    }
    return res.status(200).json({
      success: true,
      message: `Order status updated to ${status}.`,
      order,
    });
  } catch (err) {
    console.error("updateOrderStatus error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};

// ──────────────────────────────────────────────────────────────────────────
// GET /api/orders   (Admin only)
// Returns ALL orders (for library dashboard), newest first.
// ──────────────────────────────────────────────────────────────────────────
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("getAllOrders error:", err);
    return res.status(500).json({ success: false, message: "Internal server error." });
  }
};
// POST /api/orders/pay
// Mock payment — simulates success/failure
const mockPayment = async (req, res) => {
  const { amount, paymentMethod, upiId, cardNumber } = req.body;

  if (!amount || !paymentMethod) {
    return res.status(400).json({ success: false, message: "Amount and payment method required." });
  }

  // Simulate a transaction ID
  const transactionId = `TXN_${Date.now()}_${Math.floor(Math.random() * 10000)}`;

  // Simulate 90% success rate (realistic demo feel)
  const isSuccess = Math.random() > 0.1;

  if (!isSuccess) {
    return res.status(402).json({
      success: false,
      message: "Payment failed. Please try again.",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Payment successful.",
    transactionId,
    amount,
    paymentMethod,
    paidAt: new Date().toISOString(),
  });
};
module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  mockPayment,
};
