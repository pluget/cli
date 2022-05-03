import minimist from "minimist";
var args = minimist(process.argv.slice(2));

import init from "./commands/init";
import help from "./commands/help";

if (args._.length === 2 && args._[0] === "help") {
  help(args._[1]).catch((err) => {
    console.error(err);
    process.exit(1);
  });
} else {
  switch (args._[0]) {
    case "init":
      init(args._[1] || "").catch((err) => {
        console.error(err);
        process.exit(1);
      });
      break;
    default:
      help().catch((err) => {
        console.error(err);
        process.exit(1);
      });
  }
}
