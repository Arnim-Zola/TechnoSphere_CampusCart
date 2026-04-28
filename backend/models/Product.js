const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,

  // ✅ ADD THIS
  inStock: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model("Product", productSchema);