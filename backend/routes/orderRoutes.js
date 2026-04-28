const express = require("express");
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  updateOrderStatus,
  getAllOrders,
  mockPayment,
} = require("../controllers/orderController");

// ── Auth middleware ──────────────────────────────────────────────────────
// This middleware is shared with Member 1 (auth). Import from wherever they place it.
// Example path: ../middleware/authMiddleware
const protect = require("../middleware/authMiddleware");

// ── Admin middleware (optional, simple role check) ───────────────────────
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") return next();
  return res.status(403).json({ success: false, message: "Admin access only." });
};

// ── Student routes (protected) ───────────────────────────────────────────
router.post("/pay", protect, mockPayment);
router.post("/", protect, createOrder);           // Place a new order
router.get("/my", protect, getMyOrders);          // View own orders
router.get("/:id", protect, getOrderById);        // View single order

// ── Admin routes (protected + admin only) ────────────────────────────────
router.get("/", protect, adminOnly, getAllOrders);                        // All orders
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);
// Update status

module.exports = router;
