import version from '../components/prompts/version';
import server from '../components/prompts/server';
import {getDownloadUrl} from '../connections/mojang';

export default async function prompt() {
  await server(await version());
  const url = await getDownloadUrl("1.18.2");
  console.log(url);
};