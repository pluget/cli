import version from '../components/promptVersion';
import server from '../components/promptServer';

export default async function prompt() {
  await server(await version());
};