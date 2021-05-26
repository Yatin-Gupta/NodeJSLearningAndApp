const Product = require("../../model/Product");
const Cart = require("../../model/Cart");

module.exports = (req, res, next) => {
  Cart.getCartAttributes((cart) => {
    Product.fetchAll((products) => {
      Cart.getProductsQuantity(products, (productsWithCartQuantity) => {
        res.render("product", {
          products: productsWithCartQuantity,
          pageTitle: "Products",
          activePath: "products",
          cart: cart,
        });
      });
    });
  });
};
