#!/usr/bin/env node

import minimist from "minimist";
const args = minimist(process.argv.slice(2));
import log from 'loglevel';

import init from "./commands/init";
import help from "./commands/help";

function catchedError(err: Error): void {
  log.error(err);
  process.exit(1);
}

if (args._.length === 2 && args._[0] === "help") {
  help(args._[1]);
} else {
  switch (args._[0]) {
    case "init":
      init(args._[1] || "").catch(catchedError);
      break;
    default:
      help();
  }
}
