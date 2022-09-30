#! /usr/bin/env node

const yargs = require("yargs");
const pkg = require("../package.json");
const locate = require("./commands/locate");
const { detail } = require("./commands/detail");

yargs
  .scriptName("cy-eye")
  .usage("$0 <cmd> [args]")
  .command(
    "locate [path]",
    "",
    (yargs) => {
      yargs.positional("path", {
        type: "string",
        describe: "component path to locate cy tags",
      });
    },
    (argv) => locate(argv)
  )
  .command(
    "detail",
    "",
    (yargs) => {},
    (argv) => detail(argv)
  )
  .help("help")
  .alias("help", "h")
  .version(pkg.version)
  .alias("version", "v")
  .locale("en-US").argv;
