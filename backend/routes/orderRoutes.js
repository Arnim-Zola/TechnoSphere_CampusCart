const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  updateOrderStatus,
  getOrderNotifications,
  markOrderNotified,
} = require("../controllers/orderController");

router.get("/", getOrders);
router.get("/notifications", getOrderNotifications);
router.post("/", createOrder);
router.patch("/:id/status", updateOrderStatus);
router.patch("/:id/notify", markOrderNotified);

module.exports = router;
