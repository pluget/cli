import version from '../components/prompts/version';
import server from '../components/prompts/server';

export default async function init(path: string) {
  console.log(path)
  await server(await version());
};