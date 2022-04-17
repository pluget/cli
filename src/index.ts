import minimist from 'minimist';
var args = minimist(process.argv.slice(2));

import init from './commands/init';
import help from './commands/help';

if (args._.length !== 1) {
  help();
}