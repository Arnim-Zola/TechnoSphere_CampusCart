const express = require("express");
const router = express.Router();
const stationeryData = require("../data/stationeryData");

router.get("/", (req, res) => {
  res.json(stationeryData);
});

module.exports = router;