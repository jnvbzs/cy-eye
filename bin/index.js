#! /usr/bin/env node
const yargs = require("yargs");
const chalk = require("chalk");
const glob = require("glob");
const fs = require("fs");

const header = chalk.magenta(
  "   ___________  __      __________  ______\n\
_  ___/_  / / /_______  _ \\_  / / /  _ \\\n\
/ /__ _  /_/ /_/_____/  __/  /_/ //  __/\n\
\\___/ _\\__, /        \\___/_\\__, / \\___/\n\
`    `/____/              /____/\n"
);

const usage = `${header}\nUsage: cy-eye ${chalk.yellow("<path_to_run>")}`;

yargs.usage(usage).help(true).option("context", {
  describe: "Create a context directory to yout locator",
  type: "string",
}).argv;

if (!yargs.argv._[0]) {
  console.log(
    chalk.red(
      "You should pass the path to run cy-eye. Try call cy-eye <path_to_run>"
    )
  );
} else {
  const path = yargs.argv._[0];

  console.log("running in path...👾:", chalk.yellow(path), "\n");

  const mapper = require("./core/mapper");
  const writer = require("./core/writer");

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
            const jsonLocators = mapper(file, contents);
            writer(yargs.argv.context, jsonLocators);
          }
        });
      });
    }
  });
}
