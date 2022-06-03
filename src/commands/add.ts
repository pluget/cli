import promptPluginSearch from "../components/prompts/plugins";
import createDebugMessages from "debug";
import spigetVersionIdAndName from "../connections/spigetVersionIdAndName";
import toSemVer from "../components/toSemVer";
import promptVersion from "../components/prompts/version";
import addDependencyToPackageJson from "../components/addDependencyToPackageJson";
import installPlugin from "../components/installPlugin";
const debug = createDebugMessages("choices");

export default async function add(pluginNameAndVersion: string) {
  const [pluginName, version] = pluginNameAndVersion.split("@");
  const pluginId = await promptPluginSearch(pluginName);
  debug(pluginId, typeof pluginId);
  const versions = await spigetVersionIdAndName(pluginId);
  const semVers = new Array();
  for (let i = versions.length - 1; i >= 0; i--) {
    const version = versions[i];
    debug(version);
    const semVer = await toSemVer(version.name);
    semVers.push({ title: semVer, value: version.id });
    debug(version.name, semVer, version.id);
  }
  const selectedVersion = await promptVersion(semVers, version);
  debug(selectedVersion);

  addDependencyToPackageJson(pluginName, selectedVersion);
  installPlugin(process.cwd(), pluginId, selectedVersion);
}
