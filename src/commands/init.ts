import name from '../components/prompts/name';
import version from '../components/prompts/version';
import server from '../components/prompts/server';
import createServer from '../components/createServer';

export default async function init(path: string) {
  let serverName = await name();
  await server(await version());
  await createServer(path, serverName.value);
};