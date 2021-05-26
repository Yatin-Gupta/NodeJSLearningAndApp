const Cart = require("../../model/Cart");

module.exports = (req, res, next) => {
  const { quantity, product } = req.body;
  Cart.save(JSON.parse(product), quantity);
  res.location("/");
  return res.redirect(301, "/");
};
