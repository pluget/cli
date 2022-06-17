import fse from "fs-extra";
import { resolve } from "path";
import * as IPFS from "ipfs-core";
import downloadPlugin from "./downloadPlugin";
import log from "loglevel";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function installPlugin(
  name: string,
  verid: number,
  dir: string
): Promise<void> {
  const node = await IPFS.create();
  debug("IPFS node created");

  const blob = await downloadPlugin(verid, node);

  const modulesPath = resolve(dir, "./modules/plugins/");
  const modulePath = resolve(modulesPath, `./${name}.jar`);
  const promises: Promise<any>[] = [];

  promises.push(
    fse.ensureDir(modulesPath),
    fse.writeFile(modulePath, Buffer.from(await blob.arrayBuffer())),
    fse.symlink(
      `../modules/plugins/${name}.jar`,
      resolve(dir, `./plugins/${name}.jar`)
    )
  );

  try {
    await Promise.all(promises);
  } catch (e) {
    log.warn(e);
  }
  debug("Plugin installed");
  await node.stop();
}
