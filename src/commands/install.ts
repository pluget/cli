import { resolve } from "path";
import installServer from "../components/installServer";
import packageJson from "../interfaces/packageJson";

export default async function install(path: string) {
  const dir = resolve(process.cwd(), path);
  const packageJson: packageJson = require(resolve(dir, "package.json"));
  for (const [name, version] of Object.entries(packageJson.server)) {
    await installServer(name, version, dir);
  }
}
