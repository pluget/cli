import minimist from 'minimist';
var args = minimist(process.argv.slice(2));

import init from './commands/init';
import help from './commands/help';

if (args._.length === 2 && args._[0] === "help") {
  help(args._[1]);
} else if (args._.length !== 1) {
  help();
} else {
  switch (args._[0]){
    case "init": 
      init();
      break;
    default:
      help();
  }
};