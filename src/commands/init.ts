import fse from 'fs-extra';
import {join, resolve} from 'path';
import name from '../components/prompts/name';
import version from '../components/prompts/version';
import server from '../components/prompts/server';
import createServer from '../components/createServer';

export default async function init(path: string): Promise<void> {
  const parentDir = resolve(process.cwd(), path)

  try {
    await fse.access(parentDir);
  } catch (err) {
    throw new Error(`The directory ${parentDir} does not exist.`);
  }

  const serverName = await name();

  const dir = join(parentDir, serverName.value);

  fse.access(dir, (err) => {
    if (!err) {
      throw new Error(`Directory ${dir} already exists`);
    }
  })

  await createServer(path, serverName.value, (await server(await version())).download || "");
};