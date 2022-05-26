import fse from "fs-extra";
import jsonfile from "jsonfile";
import { resolve } from "path";

export default async function addDependencyToPackageJson(
  pluginName: string,
  pluginVersion: string,
  path?: string
) {
  if (path === undefined) {
    path = process.cwd();
  }
  const packageJsonPath = resolve(path, "./package.json");
  const packageJson = await jsonfile.readFile(packageJsonPath);
  packageJson.dependencies[pluginName] = "^" + pluginVersion.split("+")[0];
  const writeFile = jsonfile.writeFile(packageJsonPath, packageJson, {
    spaces: 2,
  });
  await writeFile;
}
