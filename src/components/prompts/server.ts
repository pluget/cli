import prompts from 'prompts';
import { cwd } from 'process';
import paper from '../../connections/apiPaperBuild';
import spigot from '../../connections/apiSpigotBuild';
import { getDownloadUrl as vanillaGetDownloadUrl} from '../../connections/mojang';

export default async function serverType(version: string) {
  const [paperBuild, spigotDownload, vanillaDownload] = await Promise.all([paper(version), spigot(version), vanillaGetDownloadUrl(version)]);
  const selectedServer = await prompts({
    type: 'select',
    name: 'value',
    message: 'Pick a color',
    choices: [
      { title: 'Paper', description: 'recommended', disabled: paperBuild === null ? true : false},
      { title: 'Spigot', disabled: spigotDownload === null ? true : false },
      { title: 'Vanilla', disabled: vanillaDownload === null ? true : false },
    ],
    initial: 0
  })
  console.log(selectedServer, cwd())
}