import fse from "fs-extra";
import { resolve } from "path";
import {
  getBukkitDownloadUrl,
  getSpigotDownloadUrl,
} from "../connections/getbukkit";
import { getDownloadUrl as getVanillaDownloadUrl } from "../connections/mojang";
import {
  getDownloadUrl as getPaperDownloadUrl,
  getDownloadUrlForSpecificBuild as getPaperDownloadUrlForSpecificBuild,
} from "../connections/papermc";
import packageJson from "../interfaces/packageJsonInterface";
import downloadServer from "./downloadServer";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging")

async function getDownloadUrl(packageJson: packageJson) {
  let downloadUrl = "";
  for (const server in packageJson.server) {
    debug(server);
    const [serverVersion, serverBuild] = packageJson.server[server].split("-");
    debug(serverVersion, serverBuild)
    switch (server) {
      case "glowstone":
        throw Error("Glowestone is not implemented yet");
      case "paper":
        debug("switch - paper")
        if (serverBuild !== undefined) {
          downloadUrl =
            (await getPaperDownloadUrlForSpecificBuild(
              serverVersion,
              parseInt(serverBuild)
            )) || "";
        } else {
          downloadUrl = (await getPaperDownloadUrl(serverVersion)) || "";
        }
        break;
      case "spigot":
        downloadUrl = await getSpigotDownloadUrl(serverVersion);
        break;
      case "bukkit":
        downloadUrl = await getBukkitDownloadUrl(serverVersion);
        break;
      case "vanilla":
        downloadUrl = await getVanillaDownloadUrl(serverVersion);
        break;
    }
  }
  return downloadUrl
}

export default async function installServer(path: string) {
  const packageJsonPath = resolve(path, "./package.json");
  const packageJson: packageJson = await fse.readJson(packageJsonPath);

  const downloadUrl = await getDownloadUrl(packageJson);

  debug(downloadUrl);

  const modulesServerPath = resolve(path, "./modules/server/");
  fse.ensureDir(modulesServerPath);
  fse.copy(
    await downloadServer(downloadUrl, "server"), resolve(modulesServerPath, "./server.jar")
  );
  fse.ensureDir(resolve(path, "./bin"))
  fse.symlink(resolve(path, "./bin/server.jar"), resolve(modulesServerPath, "./server.jar"));
}
