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

module.exports = router;