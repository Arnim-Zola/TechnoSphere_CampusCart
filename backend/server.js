const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const productRoutes = require("./routes/productRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const startServer = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/campuscart");
    console.log("MongoDB Connected");

    app.use("/api/products", productRoutes);

    app.get("/", (req, res) => {
      res.send("API Running");
    });

    app.listen(5000, () => {
      console.log("Server running on port 5000");
    });

  } catch (err) {
    console.log(err);
  }
};

startServer();