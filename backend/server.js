const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// ✅ Import routes
const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/campuscart")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

// ✅ Use product routes
app.use("/api/products", productRoutes);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("API Running");
});

// ✅ Start server
app.listen(5000, () => console.log("Server running on port 5000"));