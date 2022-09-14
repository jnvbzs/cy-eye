const glob = require("glob");
const chalk = require("chalk");
const fs = require("fs");
const detailTemplate = require("../utils/details-template");

function locateTags(htmlFile, tagToLocate = "data-test") {
  const tagToLocateRegex = new RegExp(`${tagToLocate}="(.*?)"`, "g");

  const cyTags = htmlFile.match(tagToLocateRegex);

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

function buildLocators(
  pathToCreateLocators,
  component,
  stringLocators,
  detailTemplate
) {
  fs.mkdir(`${pathToCreateLocators}${component}`, function (err) {
    if (err) {
      console.log(
        chalk.red(`Failed to create ${component} component directory`),
        err.code === "EEXIST"
          ? chalk.red(`because this directory already exists`)
          : ""
      );

      process.exit(1);
    }

    fs.writeFile(
      `${pathToCreateLocators}${component}/locators.js`,
      stringLocators,
      function (err) {
        if (err) {
          console.log(
            chalk.red(
              `Failed to create locator json file in ${component} directory`
            )
          );

          process.exit(1);
        }
      }
    );

    fs.writeFile(
      `${pathToCreateLocators}${component}/locator.customize.js`,
      detailTemplate,
      function (err) {
        if (err) {
          console.log(
            chalk.red(
              `Failed to create locator json file in ${component} directory`
            )
          );

          process.exit(1);
        }
      }
    );
  });
}

module.exports = function (argv) {
  const path = argv.path;
  const component = argv.component;

  if (!path) {
    console.log(chalk.red("Missing [path] arg"));
    process.exit(1);
  }
  if (!component) {
    console.log(chalk.red("Missing [component] arg"));
    process.exit(1);
  }

  let pathToCreateLocators;
  let tagToLocate;

  fs.readFile("./cy-eye.config.json", (err, file) => {
    if (err) {
      err.code === "ENOENT"
        ? console.log(chalk.red("Failed to find cy-eye config file"))
        : console.log(chalk.red(err.message));

      process.exit(1);
    }

    pathToCreateLocators = JSON.parse(file).basePath;
    tagToLocate = JSON.parse(file).tagToLocate;
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

        const locators = locateTags(contents, tagToLocate);
        const stringLocators = `const ${component} = ${JSON.stringify(locators)}
        
        module.exports = ${component}
        `;

        fs.mkdir(`${pathToCreateLocators}`, function (err) {
          if (err) {
            err.code === "EEXIST"
              ? buildLocators(
                  pathToCreateLocators,
                  component,
                  stringLocators,
                  detailTemplate
                )
              : console.log(chalk.red(err.message));
          } else buildLocators(pathToCreateLocators, component, stringLocators, detailTemplate);
        });
      });
    });
  });
};
