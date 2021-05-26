const express = require("express");
const productsController = require("../controller/products");

const router = express.Router();

router.post("/cart", productsController.addItemInCart);
router.get("/", productsController.getProducts);

module.exports = router;
