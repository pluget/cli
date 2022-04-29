import fs from 'fs';
import fse from 'fs-extra';
import { join } from 'path';

export default async function createServer(path: string, projectName: string) {
  const parentDir = join(process.cwd(), path)
  const dir = join(parentDir, projectName);
  const checkParentDirectoryExists = fs.access(parentDir, (err) => {
    if (err) {
      throw new Error(`The directory ${parentDir} does not exist.`);
    }
  });
  const checkProjectExist = fs.access(dir, (err) => {
    if (!err) {
      throw new Error(`Directory ${dir} already exists`);
    }
  });
  await Promise.all([checkParentDirectoryExists, checkProjectExist]);
  await fse.mkdir(dir);
  await fse.copy(join(__dirname, '..', 'templates', 'server'), dir);
}