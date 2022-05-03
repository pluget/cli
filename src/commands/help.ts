import { readFile } from "fs";
import { resolve } from "path";

export default function help(command?: string): void {
  switch (command) {
    case "init":
      readFile(
        resolve(__dirname, "../../resources/views/help/init.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
      break;
    case "add":
      readFile(
        resolve(__dirname, "../../resources/views/help/add.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
      break;
    case "install":
      readFile(
        resolve(__dirname, "../../resources/views/help/install.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
      break;
    case "upgrade":
      readFile(
        resolve(__dirname, "../../resources/views/help/upgrade.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
      break;
    case "search":
      readFile(
        resolve(__dirname, "../../resources/views/help/search.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
      break;
    default:
      readFile(
        resolve(__dirname, "../../resources/views/help/index.txt"),
        "utf8",
        (err, data) => {
          if (err) {
            console.error(err);
            return;
          }
          console.log(data);
        }
      );
  }
}
