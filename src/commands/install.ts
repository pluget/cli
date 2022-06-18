import { resolve } from "path";
import installPlugin from "../components/installPlugin";
import installServer from "../components/installServer";
import toSemVer from "../components/toSemVer";
import names from "../connections/names";
import spigetVersionIdAndName from "../connections/spigetVersionIdAndName";
import packageJson from "../interfaces/packageJson";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function install(path: string) {
  const dir = resolve(process.cwd(), path);
  const packageJson: packageJson = require(resolve(dir, "package.json"));
  for (const [name, version] of Object.entries(packageJson.server)) {
    await installServer(name, version, dir);
  }
  const namesAndIds = await names();
  for (const [name, version] of Object.entries(packageJson.dependencies)) {
    const id = namesAndIds.find((n) => n.title === name)?.value || 0;
    if (id === 0) {
      throw Error(
        `Could not find id for ${name}\nPlease remove it from package.json and install it manually`
      );
    }
    const availableVersions = await spigetVersionIdAndName(id);
    const verid = availableVersions.filter(
      async (e) => (await toSemVer(e.name)) === version
    )[0].id;
    await installPlugin(name, verid, dir);
  }
}
