const chalk = require("chalk");
const fs = require("fs");
chalk;

function writeLocators(context, jsonLocators) {
  let cyEyeDir = "./cy-eye-locators";

  fs.mkdir(`${cyEyeDir}`, function () {});

  if (context) {
    fs.mkdir(`${cyEyeDir}/${context}`, function () {});

    fs.writeFile(
      `${cyEyeDir}/${context}/locator.json`,
      JSON.stringify(jsonLocators),
      function (error) {
        if (error) console.log(chalk.red(error.message));

        console.log("Created file", chalk.magenta(`${cyEyeDir}/${context}/locator.json`));
      }
    );
  } else {
    fs.writeFile(
      `${cyEyeDir}/locator.json`,
      JSON.stringify(jsonLocators),
      function (error) {
        if (error) console.log(chalk.red(error.message));

        console.log("Created file", chalk.magenta(`${cyEyeDir}/locator.json`));
      }
    );
  }
}

module.exports = writeLocators;
