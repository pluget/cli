import fs from "fs";
import fse from "fs-extra";
import { join, resolve } from "path";
import git from "isomorphic-git";
import createPackageJson from "./createPackageJson";
import downloadServer from "./downloadServer";
import installServer from "./installServer";

export default async function createServer(
  path: string,
  projectName: string,
  downloadPath: string,
  serverVersionType: string,
  serverVersion: string
) {
  const parentDir = resolve(process.cwd(), path);
  const dir = join(parentDir, projectName);

  await Promise.all([
    fs.access(parentDir, (err) => {
      if (err) {
        throw new Error(`The directory ${parentDir} does not exist.`);
      }
    }),
    fs.access(dir, (err) => {
      if (!err) {
        throw new Error(`Directory ${dir} already exists`);
      }
    }),
  ]);

  await fse.mkdir(dir);

  await git.init({ fs, dir });

  await fse.ensureDir(resolve(dir, "./modules/plugins"));

  const pluginDir = {
    path: "./modules/plugins",
    dest: "./plugins",
    files: [],
  } as {
    path: string;
    dest: string;
    files: string[];
  };

  pluginDir.files = await fse.readdir(resolve(dir, pluginDir.path));

  const symlinkPromises = [] as Promise<void>[];

  for (const file of pluginDir.files) {
    symlinkPromises.push(
      fse.symlink(
        join("..", pluginDir.path, file),
        resolve(dir, pluginDir.dest, file)
      )
    );
  }

  await fse.copy(
    await downloadServer(downloadPath, "server"),
    resolve(dir, "./modules/server/server.jar")
  );

  await Promise.all([
    createPackageJson(dir, projectName, "0.1.0", serverVersionType, {
      name: serverVersionType,
      version: serverVersion,
    }),
    fse.copy(resolve(__dirname, "../templates/createServer"), dir),
    fse.ensureDir(resolve(dir, "./logs/logs")),
    fse.ensureDir(resolve(dir, "./plugins")),
    fse.ensureDir(resolve(dir, "./worlds/world")),
    fse.ensureDir(resolve(dir, "./worlds/world_nether")),
    fse.ensureDir(resolve(dir, "./worlds/world_the_end")),
    fse.ensureDir(resolve(dir, "./modules/server")),
    symlinkPromises,
  ]);

  await git.add({ fs, dir, filepath: "." });
  await git.commit({
    fs,
    dir,
    message: "Initial commit",
    author: {
      name: "Maciej Błędkowski",
      email: "mpm@mble.dk",
    },
  });

  await installServer(dir);
}
