import fs from 'fs';
import fse from 'fs-extra';
import { join, resolve } from 'path';
import installServer from './installServer';

export default async function createServer(path: string, projectName: string) {
  const parentDir = resolve(process.cwd(), path)
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
    })
  ]);

  await fse.mkdir(dir);

  await Promise.all([
    fse.copy(resolve(__dirname, '../templates/createServer'), dir),
    fse.ensureDir(resolve(dir, './logs/logs')),
    fse.ensureDir(resolve(dir, './plugins')),
    fse.ensureDir(resolve(dir, './worlds/world')),
    fse.ensureDir(resolve(dir, './worlds/world_nether')),
    fse.ensureDir(resolve(dir, './worlds/world_the_end')),
    fse.ensureDir(resolve(dir, './modules/server')),
    fse.ensureDir(resolve(dir, './modules/plugins')),
  ]);

  await installServer(dir);
}