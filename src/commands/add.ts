import promptPluginSearch from "../components/prompts/plugins";
import spigetVersionIdAndName from "../connections/spigetVersionIdAndName";
import toSemVer from "../components/toSemVer";
import promptVersion from "../components/prompts/version";
import addDependencyToPackageJson from "../components/addDependencyToPackageJson";
import installPlugin from "../components/installPlugin";
import veridToCid from "../connections/veridToCid";
import pluginNames from "../connections/names";
import createDebugMessages from "debug";
const debug = createDebugMessages("choices");

export default async function add(pluginNameAndVersion: string) {
  let [pluginName, version] = pluginNameAndVersion.split("@");
  const awaitedPluginNames = await pluginNames();
  const pluginId: number = await promptPluginSearch(
    awaitedPluginNames,
    pluginName
  );
  debug(pluginId);
  if (pluginName === "" || pluginName === undefined) {
    pluginName =
      awaitedPluginNames.find((e) => e.value === pluginId)?.title || "";
  }
  const availableVersions = await spigetVersionIdAndName(pluginId);
  const semanticVersions = [];

  for (let i = availableVersions.length - 1; i >= 0; i--) {
    const version = availableVersions[i];
    debug(version);
    const semVer = await toSemVer(version.name);
    debug(version.id);
    if ((await veridToCid(version.id)) !== null) {
      if (i === availableVersions.length - 1) {
        semanticVersions.push({
          title: semVer,
          value: version.id,
          disabled: false,
          description: "latest",
        });
      } else {
        semanticVersions.push({
          title: semVer,
          value: version.id,
          disabled: false,
        });
      }
    } else {
      semanticVersions.push({
        title: semVer,
        value: version.id,
        disabled: true,
      });
    }
  }
  debug(semanticVersions);
  const selectedVersion = await promptVersion(semanticVersions, version);
  debug(selectedVersion);

  addDependencyToPackageJson(
    pluginName,
    semanticVersions.filter((e) => selectedVersion === e.value)[0].title
  ).catch((err) => {
    throw err;
  });

  installPlugin(pluginName, selectedVersion, process.cwd()).catch((err) => {
    throw err;
  });
}
