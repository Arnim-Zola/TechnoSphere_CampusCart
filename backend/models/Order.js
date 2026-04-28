const mongoose = require("mongoose");

// ─── Order Item Sub-schema ─────────────────────────────────────────────────
const orderItemSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, default: "" },
    // Print-specific (optional)
    fileName: { type: String },
    fileUrl: { type: String },
    pages: { type: Number },
    printType: { type: String, enum: ["bw", "color", null] },
  },
  { _id: false }
);

// ─── Order Schema ──────────────────────────────────────────────────────────
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: {
      type: [orderItemSchema],
      required: true,
      validate: [(v) => v.length > 0, "Order must have at least one item."],
    },
    totalAmount: { type: Number, required: true },
    pickupSlot: { type: String, required: true },
    paymentMethod: {
      type: String,
      enum: ["upi", "card", "netbanking", "cash"],
      required: true,
    },
    transactionId: { type: String },
    // Status lifecycle: Pending → Processing → Ready → Collected
    status: {
      type: String,
      enum: ["Pending", "Processing", "Ready", "Collected"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
