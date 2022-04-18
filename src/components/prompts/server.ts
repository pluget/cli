import prompts from 'prompts';
import { cwd } from 'process';
import { getLatestBuild as paperGetLatestBuild} from '../../connections/papermc';
import { getDownloadUrl as spigotGetDownloadUrl} from '../../connections/getbukkit';
import { getDownloadUrl as vanillaGetDownloadUrl} from '../../connections/mojang';

export default async function serverType(version: string) {
  const [paperBuild, spigotDownload, vanillaDownload] = await Promise.all([paperGetLatestBuild(version), spigotGetDownloadUrl(version), vanillaGetDownloadUrl(version)]);
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