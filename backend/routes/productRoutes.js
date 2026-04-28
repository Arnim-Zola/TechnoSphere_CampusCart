const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

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

// SEED DATA (temporary)
router.get("/seed", async (req, res) => {
  await Product.insertMany([
    { name: "A4 Sheets", price: 100, category: "paper", image: "https://via.placeholder.com/100", description: "Paper pack" },
    { name: "Notebook", price: 50, category: "paper", image: "https://via.placeholder.com/100", description: "Notebook" },
    { name: "Scale", price: 20, category: "measuring", image: "https://via.placeholder.com/100", description: "15 cm scale" },
    { name: "Compass", price: 80, category: "measuring", image: "https://via.placeholder.com/100", description: "Geometry compass" },
    { name: "Stapler", price: 120, category: "utility", image: "https://via.placeholder.com/100", description: "Office stapler" }
  ]);

  res.send("Products inserted");
});

module.exports = router;