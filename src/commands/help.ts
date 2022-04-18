import { readFile } from 'fs';
import { join } from 'path';

export default async function help(command?: string) {
  switch (command) {
    case 'init':
      readFile(join(__dirname, '/../views/help/init.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      break;
    case 'add':
      readFile(join(__dirname, '/../views/help/add.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      break;
    case 'install':
      readFile(join(__dirname, '/../views/help/install.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      break;
    case 'upgrade':
      readFile(join(__dirname, '/../views/help/upgrade.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      break;
    case 'search':
      readFile(join(__dirname, '/../views/help/search.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
      break;
    default:
      readFile(join(__dirname, '/../views/help/index.txt'), 'utf8', (err, data) => {
        if (err) {
          console.error(err);
          return;
        }
        console.log(data);
      });
  }
}