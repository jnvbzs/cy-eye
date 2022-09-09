const glob = require("glob");
const chalk = require("chalk");
const fs = require("fs");

function locateTags(htmlFile) {
  const cyTags = htmlFile.match(/data-test="(.*?)"/g);

  let locators = {};

  cyTags.forEach((tag) => {
    const locatorName = tag.match(/"(.*?)"/)[0].replace(/"/g, "");
    const tagValue = tag.replace(/\\/g);

    const alreadyHaveLocatorName = Object.keys(locators).find(
      (key) => key === locatorName
    );

    if (alreadyHaveLocatorName) {
      console.log(chalk.red(`Duplicated locator "${locatorName}" name`));

      process.exit(1);
    }

    locators[locatorName] = `[${tagValue}]`;
  });

  return locators;
}

module.exports = function (argv) {
  const path = argv._[0];

  const context = argv.context;
  let pathToCreateLocators;

  fs.readFile("./cy-eye.config.json", (err, file) => {
    if (err) {
      err.code === "ENOENT"
        ? console.log(chalk.red("Failed to find cy-eye config file"))
        : console.log(chalk.red(err.message));

      process.exit(1);
    }

    pathToCreateLocators = JSON.parse(file).basePath;
  });

  glob(`${path}/**/*.html`, function (err, files) {
    if (err) {
      console.log(chalk.red(`Failed to read html files in path ${path}`));

      process.exit(1);
    }

    files.forEach((file) => {
      fs.readFile(file, "utf-8", function (err, contents) {
        if (err) {
          console.log(chalk.red(`Failed to read data from ${file}`));

          process.exit(1);
        }

        const locators = locateTags(contents);
        const stringLocators = JSON.stringify(locators);

        if (context) {
          fs.mkdir(`${pathToCreateLocators}${context}`, function (err) {
            if (err) {
              console.log(
                chalk.red(`Failed to create ${context} context directory`),
                err.code === "EEXIST"
                  ? chalk.red(`because this directory already exists`)
                  : ""
              );

              process.exit(1);
            }

            fs.writeFile(
              `${pathToCreateLocators}${context}/locators.json`,
              stringLocators,
              function (err) {
                if (err) {
                  console.log(
                    chalk.red(
                      `Failed to create locator json file in ${context} directory`
                    )
                  );

                  process.exit(1);
                }
              }
            );
          });
        } else {
          fs.writeFile(
            `${pathToCreateLocators}locators.json`,
            stringLocators,
            function (err) {
              if (err) {
                console.log(
                  chalk.red(
                    `Failed to create locator json file in ${context} directory`
                  )
                );

                process.exit(1);
              }
            }
          );
        }
      });
    });
  });
};
