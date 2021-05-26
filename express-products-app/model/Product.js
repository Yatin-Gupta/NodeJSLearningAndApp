const { v4: uuidv4 } = require("uuid");
const dataService = require("../service");
const dataFile = "products.json";

class Product {
  constructor(title, price) {
    this.title = title;
    this.price = price;
    this.id = uuidv4();
  }

  save(onSuccess = () => {}, onError = () => {}) {
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        parsedData.push(this);
        dataService.exportData(
          JSON.stringify(parsedData),
          () => {},
          () => {},
          dataFile
        );
      },
      () => {
        dataService.exportData(
          JSON.stringify([this]),
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

  static fetchAll(onSuccess = () => {}, onError = () => {}) {
    dataService.importData(
      (importedData) => {
        const parsedData = JSON.parse(importedData);
        onSuccess(parsedData);
      },
      (err) => {
        console.log(err);
        onError(err);
        onSuccess([]);
      },
      dataFile
    );
  }
}

module.exports = Product;
