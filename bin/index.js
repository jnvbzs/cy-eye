#! /usr/bin/env node

const yargs = require("yargs");
const pkg = require("../package.json");
const init = require("./init");

const argv = yargs
  .alias("config", "c")
  .usage("\nUsage: cy-eye <path>")
  .options({
    context: {
      alias: "C",
      description: "Set context",
      type: "string",
    },
  })
  .help("help")
  .alias("help", "h")
  .version(pkg.version)
  .alias("version", "v")
  .locale("en-US").argv;

init(argv);
