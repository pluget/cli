import fse from "fs-extra";
import path from "path";
import * as IPFS from "ipfs-core";
import createDebugMessages from "debug";
import downloadPlugin from "./downloadPlugin";
const debug = createDebugMessages("debugging");

export default async function installPlugin(
  dir: string,
  name: string,
  verid: number
): Promise<void> {
  const node = await IPFS.create();
  debug("IPFS node created");

  const blob = await downloadPlugin(verid, node);

  const modulePath = path.resolve(dir, `./modules/plugins/${name}.jar`);
  fse.writeFile(modulePath, Buffer.from(await blob.arrayBuffer()));
  fse.symlink(
    `../modules/plugins/${name}.jar`,
    path.resolve(dir, `./plugins/${name}.jar`)
  );
  debug("Plugin installed");
  await node.stop();
}
