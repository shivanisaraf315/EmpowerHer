const fs = require("fs");
const path = require("path");

function readDataFile() {
  return new Promise((resolve, reject) => {
    const filePath = path.join(__dirname, "Data.txt");

    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = readDataFile;
