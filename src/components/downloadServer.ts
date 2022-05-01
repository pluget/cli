import { homedir } from 'os';
import { resolve } from 'path';
import fse from 'fs-extra';

export default async function downloadServer(url: string){
  const cacheFolder = resolve(homedir(), './.config/mpm');
  const serverFolder = resolve(cacheFolder, './server');
  const ensureDirServerFolder = fse.ensureDir(serverFolder);

  const fetchUrl = fetch(url);

  const [_, response] = await Promise.all([ensureDirServerFolder, fetchUrl]);
  const file = await response.blob();

  const filePath = resolve(serverFolder, './server.jar');
  const writeFile = fse.appendFile(filePath, Buffer.from((await file.arrayBuffer())));

  await writeFile;
}