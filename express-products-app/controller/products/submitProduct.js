const Product = require("../../model/Product");

module.exports = (req, res, next) => {
  const { title, price } = req.body;
  const product = new Product(title, price);
  product.save();
  res.location("/");
  return res.redirect(301, "/");
};
