const fs = require("fs");
const chalk = require("chalk");
const glob = require("glob");
const { exec } = require("child_process");
const { createSpinner } = require("nanospinner");

function detail() {
  glob("./**/*.customize.js", function (err, files) {
    if (err) {
      console.log(chalk.red("Failed to read customize files"));

      process.exit(1);
    }

    files.forEach((file) => {
      exec(`node ${file}`, function (err) {
        const spinner = createSpinner(`Detailing ${file} locators`);

        if (err) {
          console.log(chalk.red("Failed to run customize files"));

          process.exit(1);
        }

        spinner.success();
      });
    });
  });
}

module.exports = {
  detail,
};
