const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// 🔥 DEBUG: confirm file is running
console.log("🔥 SERVER FILE LOADED");

// ✅ Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes"); // ⭐ IMPORTANT

console.log("✅ Routes imported");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/campuscart")
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.log("❌ MongoDB error:", err));

// ✅ Use routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes); // ⭐ CRITICAL

console.log("✅ Routes mounted");

// ✅ Root test
app.get("/", (req, res) => {
res.send("API Running");
});

// ✅ Server start
app.listen(5000, () => {
console.log("🚀 Server running on port 5000");
});
