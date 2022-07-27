#! /usr/bin/env node
// configuar o help
const yargs = require("yargs");
const chalk = require("chalk");

const header = chalk.magenta(
  "   ___________  __      __________  ______\n\
_  ___/_  / / /_______  _ \\_  / / /  _ \\\n\
/ /__ _  /_/ /_/_____/  __/  /_/ //  __/\n\
\\___/ _\\__, /        \\___/_\\__, / \\___/\n\
`    `/____/              /____/\n"
);

const usage = `${header}\nUsage: cy-eye ${chalk.yellow("<path_to_run>")}`;

yargs.usage(usage).help(true).argv;

// tratar sem argumentos
if (!yargs.argv._[0]) {
  console.log(
    chalk.red(
      "You should pass the path to run cy-eye. Try call cy-eye <path_to_run>"
    )
  );
} else {
  // pegar a rota para verificar os arquivos html
  const path = yargs.argv._[0];
  console.log("running in path...👾:", chalk.yellow(path), "\n");

  var glob = require("glob");

  // a partir da rota pegar todos os arquivos html
  glob(`${path}/**/*.html`, function (error, files) {
    if (error) {
      console.log(error.message);
    }

    if (files.length === 0) {
      console.log(`No files with match extension html in path ${path}`);
    } else {
      // para cada arquivo html
      files.forEach((file) => {
        const fs = require("fs");

        // ler o arquivo
        fs.readFile(file, "utf-8", function (error, contents) {
          console.log("Reading file...👾:", chalk.yellow(file));
          if (error) {
            console.log(error);
          } else {
            const path = require("path");
            // pegar o prefixo do arquivo
            const jsonFilePrefix = path
              .basename(file)
              .replace(".component.html", ".locator.json");
            // pegar todos valores dos data-cy
            const jsonContent = {};
            const regex = /data-cy="(.*?)"/g;

            const tags = contents.match(regex);

            tags.forEach((tag) => {
              jsonContent[
                tag.replace('"', "").replace("data-cy=", "").replace('"', "")
              ] = `[${tag.replace('"', "'").replace('"', "'")}]`;
            });

            fs.mkdir("./cy-locators", function () {});

            fs.writeFile(
              `./cy-locators/${jsonFilePrefix}`,
              JSON.stringify(jsonContent),
              function (error) {
                if (error) throw error;

                console.log(
                  "Created file",
                  chalk.magenta(
                    `./cy-locators/${jsonFilePrefix.replace(
                      "component",
                      "locator"
                    )}`
                  )
                );
              }
            );
          }
        });
      });
    }
  });
}
