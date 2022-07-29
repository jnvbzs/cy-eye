const chalk = require("chalk");
const fs = require("fs");
const path = require("path");

function writeLocators(context, jsonLocators, file) {
  const cyEyeDir = "cy-eye-locators";

  const withContext = (context) => {
    const path = `${cyEyeDir}/${context}/locator.json`;

    fs.writeFile(path, JSON.stringify(jsonLocators), function (error) {
      if (error) throw error;

      console.log("Created file", chalk.magenta(path));
    });
  };

  if (context) {
    fs.mkdir(`${cyEyeDir}`, function () {
      fs.mkdir(`${cyEyeDir}/${context}`, function () {
        withContext(context);
      });
    });
  } else {
    const contextBasedOnFileName = path.basename(file).replace(/.html/, "");

    fs.mkdir(`${cyEyeDir}`, function () {
      fs.mkdir(`${cyEyeDir}/${contextBasedOnFileName}`, function () {
        withContext(contextBasedOnFileName);
      });
    });
  }
}

module.exports = writeLocators;
