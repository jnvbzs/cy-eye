const glob = require("glob");
const chalk = require("chalk");
const fs = require("fs");

function readHtmlFiles(path) {
  const hmtlFilesContents = [];

  glob(`${path}/**/*.html`, function (error, files) {
    if (error) {
      console.log(chalk.red(error.message));
    }

    if (files.length === 0) {
      console.log(chalk.red(`No html files in path ${path}`));
    } else {
      files.forEach((file) => {
        fs.readFile(file, "utf-8", function (error, contents) {
          console.log("Reading file...👾:", chalk.yellow(file));
          if (error) {
            console.log(error);
          } else {
            hmtlFilesContents.push({ fileName: file, contents });
          }
        });
      });
    }
  });

  return hmtlFilesContents;
}

module.exports = readHtmlFiles;
