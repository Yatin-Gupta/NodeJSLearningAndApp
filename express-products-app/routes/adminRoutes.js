const express = require("express");
const productsController = require("../controller/products");

const router = express.Router();

router.get("/add-product", productsController.addProduct);
router.post("/add-product", productsController.submitProduct);

module.exports = router;
