const fs = require("fs");
const path = require("path");
const glob = require("glob");
const chalk = require("chalk");
const { createSpinner } = require("nanospinner");
const locatorTemplate = require("../utils/locator-template");
const generateLocatorName = require("../utils/generate-locator-name");

async function locateTags(htmlFile, tagToLocate = "data-test") {
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

async function buildLocators(pathToCreateLocators, component, locatorTemplate) {
  fs.mkdir(`${pathToCreateLocators}/${component}`, function (err) {
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
      `${pathToCreateLocators}/${component}/locators.js`,
      locatorTemplate,
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
  const componentPath = argv.path;

  if (!componentPath) {
    console.log(chalk.red("Missing [path] arg"));
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

    pathToCreateLocators = JSON.parse(file).locatorsDir;
    tagToLocate = JSON.parse(file).tagToLocate;
  });

  glob(`${componentPath}/**/*.html`, function (err, files) {
    if (err) {
      console.log(
        chalk.red(`Failed to read html files in path ${componentPath}`)
      );

      process.exit(1);
    }

    const filesNumber = files.length;
    const component = generateLocatorName(path.basename(files[0]));

    if (filesNumber > 1) {
      console.log(
        chalk.red(`There are more than 1 html file in your component path`)
      );

      process.exit(1);
    }

    fs.readFile(files[0], "utf-8", async function (err, contents) {
      if (err) {
        console.log(chalk.red(`Failed to read data from ${files[0]}`));

        process.exit(1);
      }

      const spinner = createSpinner("Locating tags").start();

      try {
        const locators = await locateTags(contents, tagToLocate);

        spinner.success();

        fs.mkdir(`${pathToCreateLocators}`, async function (err) {
          const spinner = createSpinner("Building locators");

          if (err) {
            err.code === "EEXIST"
              ? await buildLocators(
                  pathToCreateLocators,
                  component,
                  locatorTemplate(component, locators)
                )
              : console.log(chalk.red(err.message));
          } else {
            await buildLocators(
              pathToCreateLocators,
              component,
              locatorTemplate(component, locators)
            );
          }

          spinner.success();
        });
      } catch (err) {
        spinner.error({ text: `Cannot find ${tagToLocate}` });

        process.exit(1);
      }
    });
  });
};
