const fs = require("fs");
const chalk = require("chalk");

function eye(context, contents) {
  const locator = {};

  locator["context"] = context;

  contents.forEach((content) => {
    locator[content.name] = content.content;
  });

  return locator;
}

function createContent(name, content) {
  return { name, content };
}

function saveSnippet(locator) {
  fs.mkdir("./snippets", (err) => {
    if (err) {
      if (err.code !== "EEXIST") {
        console.log(chalk.red("Failed to create snippets directory"));

        process.exit(1);
      }
    }

    fs.mkdir(`./snippets/${locator["context"]}`, (err) => {
      if (err) {
        if (err.code !== "EEXIST") {
          console.log(chalk.red("Failed to create locator context directory"));

          process.exit(1);
        }
      }

      const jsFileContent = `
      var ${locator["context"]} = ${JSON.stringify(locator)}
      `;

      fs.writeFile(
        `./snippets/${locator["context"]}/locators.js`,
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

module.exports = {
  eye,
  createContent,
  saveSnippet,
};
