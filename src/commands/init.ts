import fse from 'fs-extra';
import {join, resolve} from 'path';
import name from '../components/prompts/name';
import version from '../components/prompts/version';
import server from '../components/prompts/server';
import createServer from '../components/createServer';

export default async function init(path: string) {
  const parentDir = resolve(process.cwd(), path)

  try {
    await fse.access(parentDir);
  } catch (err) {
    throw new Error(`The directory ${parentDir} does not exist.`);
  }

  let serverName = await name();

  const dir = join(parentDir, serverName.value);

  try {
    await fse.access(dir);
    throw new Error(`Directory ${dir} already exists`);
  } catch (err) {
  }

  await server(await version());
  await createServer(path, serverName.value);
};