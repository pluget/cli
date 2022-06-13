import fse from "fs-extra";
import { join, resolve } from "path";

export default async function initialiseServer(path: string) {
  await fse.copy(
    resolve(__dirname, "../../resources/templates/installServer"),
    path
  );

  const dirs = {} as {
    [key: string]: {
      path: string;
      dest: string;
      files: string[];
    };
  };

  dirs.configDir = { path: "./config", dest: "./bin", files: [] };
  dirs.logsDir = { path: "./logs", dest: "./bin", files: [] };
  dirs.worldsDir = { path: "./worlds", dest: "./bin", files: [] };
  dirs.modulesServerDir = {
    path: "./modules/server",
    dest: "./bin",
    files: [],
  };

  const readdirPromises = [] as Promise<void>[];

  for (const dir in dirs) {
    const promise = async () => {
      dirs[dir].files = await fse.readdir(resolve(path, dirs[dir].path));
    };
    readdirPromises.push(promise());
  }
  await Promise.all(readdirPromises);

  const symlinkPromises = [] as Promise<void>[];

  for (const dir in dirs) {
    for (const file of dirs[dir].files) {
      symlinkPromises.push(
        fse.symlink(
          join("..", dirs[dir].path, file),
          resolve(path, dirs[dir].dest, file)
        )
      );
    }
  }

  await Promise.all([
    fse.symlink("../plugins", resolve(path, "./bin/plugins"), "dir"),
    ...symlinkPromises,
  ]);
}
