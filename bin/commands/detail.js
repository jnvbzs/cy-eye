const fs = require("fs");
const chalk = require("chalk");
const glob = require("glob");
const { exec } = require("child_process");

function saveDetailsWith(locator) {
  fs.mkdir("./locator-details", (err) => {
    if (err) {
      if (err.code !== "EEXIST") {
        console.log(chalk.red("Failed to create locator-details directory"));

        process.exit(1);
      }
    }

    fs.mkdir(`./locator-details/${locator["context"]}`, (err) => {
      if (err) {
        if (err.code !== "EEXIST") {
          console.log(chalk.red("Failed to create locator context directory"));

          process.exit(1);
        }
      }

      const jsFileContent = `
      export const ${locator["context"]} = ${JSON.stringify(locator)}
      `;

      fs.writeFile(
        `./locator-details/${locator["context"]}/locators.js`,
        jsFileContent,
        (err) => {
          if (err) {
            console.log(chalk.red("Failed to create snippet js locator file"));

            process.exit(1);
          }
        }
      );
    });
  });
}

function detail() {
  glob("./**/*.customize.js", function (err, files) {
    if (err) {
      console.log(chalk.red("Failed to read customize files"));

      process.exit(1);
    }

    files.forEach((file) => {
      exec(`node ${file}`, function (err) {
        if (err) {
          console.log(chalk.red("Failed to run customize files"));

          process.exit(1);
        }
      });
    });
  });
}

module.exports = {
  saveDetailsWith,
  detail,
};
