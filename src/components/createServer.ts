import fs from 'fs';
import fse from 'fs-extra';
import { join } from 'path';

export default async function createServer(path: string, projectName: string) {
  const dir = join(process.cwd(), path, projectName);
  await fs.access(dir, fs.constants.F_OK, (err) => {
    throw new Error(`Directory ${dir} already exists`);
  });
  await fse.mkdir(dir);
  fse.copy(join(__dirname, '..', 'templates', 'server'), dir);
}