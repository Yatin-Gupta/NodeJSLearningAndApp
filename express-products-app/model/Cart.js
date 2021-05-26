const { v4: uuidv4 } = require("uuid");
const dataService = require("../service");
const dataFile = "cart.json";

class Cart {
  static save(product, quantity = 1, onSuccess = () => {}, onError = () => {}) {
    const id = uuidv4();
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        let productInitialized = false;
        for (const cartItem of parsedData) {
          if (cartItem.product.id === product.id) {
            cartItem.quantity = quantity;
            productInitialized = true;
          }
        }
        if (!productInitialized) {
          delete product.quantityInCart;
          parsedData.push({ id, product, quantity });
        }
        dataService.exportData(
          JSON.stringify(parsedData),
          () => {},
          () => {},
          dataFile
        );
      },
      () => {
        dataService.exportData(
          JSON.stringify([{ id, product, quantity }]),
          (data) => {
            onSuccess(data);
          },
          (err) => {
            console.log(err);
            onError(err);
          },
          dataFile
        );
      },
      dataFile
    );
  }

  static getTotal(parsedData) {
    let price = 0,
      quantity = 0;
    for (const row of parsedData) {
      price += parseInt(row.product.price || 0, 10);
      quantity += parseInt(row.quantity || 0, 10);
    }
    return { quantity, price };
  }

  static getCartAttributes(onSuccess = () => {}, onError = () => {}) {
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        onSuccess(Cart.getTotal(parsedData));
      },
      (err) => {
        onSuccess({ quantity: 0, price: 0 });
        console.log(err);
      },
      dataFile
    );
  }

  static getProductsQuantity(products, onSuccess = () => {}) {
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        let productsById = {};
        products.forEach((product) => {
          productsById[product.id] = product;
        });
        parsedData.forEach((cartItem) => {
          productsById[cartItem.product.id] = {
            ...productsById[cartItem.product.id],
            quantityInCart: cartItem.quantity,
          };
        });
        onSuccess(Object.values(productsById));
      },
      (err) => {
        onSuccess(products);
        console.log(err);
      },
      dataFile
    );
  }

  static fetchAll(onSuccess = () => {}, onError = () => {}) {
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        const result = { products: parsedData, total: Cart.getTotal(parsedData) };
        onSuccess(result);
      },
      (err) => {
        console.log(err);
        onError(err);
        onSuccess({ products: [], total: { quantity: 0, price: 0 } });
      },
      dataFile
    );
  }
}

module.exports = Cart;
