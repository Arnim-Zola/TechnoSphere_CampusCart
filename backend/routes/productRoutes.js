const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
//Clear DB
router.get("/clear", async (req, res) => {
  await Product.deleteMany({});
  res.send("All products deleted");
});
// GET products
router.get("/", async (req, res) => {
  const { category } = req.query;

  const products = await Product.find(
    category ? { category } : {}
  );

  res.json(products);
});

// ADD product
router.post("/", async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.json(product);
});

// SEED DATA (clears old data first → no duplicates)
router.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany({}); // ✅ clear old data

    await Product.insertMany([
      { name: "A4 Sheets", price: 100, category: "paper", image: "https://via.placeholder.com/100", description: "Paper pack", inStock: true },
      { name: "Notebook", price: 50, category: "paper", image: "https://via.placeholder.com/100", description: "Notebook", inStock: true },
      { name: "Scale", price: 20, category: "measuring", image: "https://via.placeholder.com/100", description: "15 cm scale", inStock: true },
      { name: "Compass", price: 80, category: "measuring", image: "https://via.placeholder.com/100", description: "Geometry compass", inStock: true },
      { name: "Stapler", price: 120, category: "utility", image: "https://via.placeholder.com/100", description: "Office stapler", inStock: true }
    ]);

    res.send("Products reset and inserted");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE product (toggle stock)
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;