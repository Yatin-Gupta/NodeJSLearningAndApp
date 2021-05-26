const fs = require("fs");
const importData = (onSuccess = () => {}, onError = () => {}, fileName) => {
  fs.readFile(fileName, (err, data) => {
    if (err) {
      onError(err);
    } else {
      onSuccess(data);
    }
  });
};

const exportData = (contentToWrite, onSuccess = () => {}, onError = () => {}, fileName) => {
  fs.writeFile(fileName, contentToWrite, (err, data) => {
    if (err) {
      onError(err);
    } else {
      onSuccess(data);
    }
  });
};

module.exports = {
  importData,
  exportData,
};
