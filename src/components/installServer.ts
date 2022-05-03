import fse from "fs-extra";
import { join, resolve } from "path";
import downloadServer from "./downloadServer";

export default async function installServer(path: string) {
  await fse.copy(resolve(__dirname, "../templates/installServer"), path);

  const dirs = {} as {
    [key: string]: {
      path: string;
      dest: string;
      files: string[];
    };
  };

  dirs["configDir"] = { path: "./config", dest: "./bin", files: [] };
  dirs["logsDir"] = { path: "./logs", dest: "./bin", files: [] };
  dirs["worldsDir"] = { path: "./worlds", dest: "./bin", files: [] };
  dirs["modulesServerDir"] = {
    path: "./modules/server",
    dest: "./bin",
    files: [],
  };
  dirs["modulesPluginsDir"] = {
    path: "./modules/plugins",
    dest: "./plugins",
    files: [],
  };
  [
    dirs["configDir"].files,
    dirs["logsDir"].files,
    dirs["worldsDir"].files,
    dirs["modulesServerDir"].files,
    dirs["modulesPluginsDir"].files,
  ] = await Promise.all([
    fse.readdir(resolve(path, "./config")),
    fse.readdir(resolve(path, "./logs")),
    fse.readdir(resolve(path, "./worlds")),
    fse.readdir(resolve(path, "./modules/server")),
    fse.readdir(resolve(path, "./modules/plugins")),
  ]);

  const symlinkPromises = [] as Promise<void>[];

  for (const dir in dirs) {
    for (const file of dirs[dir].files) {
      symlinkPromises.push(
        fse.symlink(
          join("..", dirs[dir].path, file),
          resolve(path, "./bin", file)
        )
      );
    }
  }

  await Promise.all([
    fse.symlink("../plugins", resolve(path, "./bin/plugins"), "dir"),
    ...symlinkPromises,
  ]);
}
