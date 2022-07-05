const express = require("express");
const Product = require("../models/products");
const Drive = require("../models/drive");
const router = express.Router();
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

router.get("/getProducts", (req, res) => {
  try {
    Product.find({}, (err, products) => {
      if (err) console.log(err);
      res.json(products);
    });
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
});

router.get("/getCampaigns", (req, res) => {
  try {
    Drive.find({}, (err, drives) => {
      if (err) console.log(err);
      res.json(drives);
    });
  } catch (error) {
    res.status(401).send({ error: "Please authenticate using a valid token" });
  }
});

module.exports = router;
