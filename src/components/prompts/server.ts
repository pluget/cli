import paper from '../../connections/apiPaperBuild';
import spigot from '../../connections/apiSpigotBuild';
import vanilla from '../../connections/apiVanillaBuild';
import prompts from 'prompts';
import { cwd } from 'process';

export default async function serverType(version: string) {
  let [paperBuild, spigotDownload, vanillaApiLink] = await Promise.all([paper(version), spigot(version), vanilla(version)]);
  const selectedServer = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a color',
    choices: [
      { title: 'Paper', description: 'recommended', disabled: paperBuild === null ? true : false},
      { title: 'Spigot', disabled: spigotDownload === null ? true : false },
      { title: 'Vanilla', disabled: vanillaApiLink === null ? true : false },
    ],
    initial: 0
  })
  console.log(selectedServer, cwd())
}