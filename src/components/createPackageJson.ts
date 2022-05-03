import { resolve } from "path";
import jsonfile from "jsonfile";

export default async function createPackageJson(path: string, serverName: string, serverVersion: string, serverType: string, serverFile: { name: string, version: string }) {
  const packageJson = {
    name: serverName,
    version: serverVersion,
    type: serverType,
    server: {
      [serverFile.name]: serverFile.version
    },
    scripts: {
      start: "/bin/sh -c \"cd ./bin; java -Xms2G -Xmx8G -jar server.jar --nogui\""
    },
    dependencies: {},
    devDependencies: {}
  }

  const packageJsonPath = resolve(path, "./package.json");
  const writeFile = jsonfile.writeFile(packageJsonPath, packageJson, { spaces: 2 })
  await writeFile;
}
