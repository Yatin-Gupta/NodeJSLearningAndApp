const Cart = require("../../model/Cart");

module.exports = (req, res, next) => {
  Cart.getCartAttributes((cart) => {
    res.render("productForm", {
      pageTitle: "Add Product",
      activePath: "add-product",
      cart,
    });
  });
};
