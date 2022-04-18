import version from '../components/prompts/version';
import server from '../components/prompts/server';

export default async function prompt() {
  await server(await version());
};