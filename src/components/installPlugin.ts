import fse from "fs-extra";
import path from "path";
import * as IPFS from "ipfs-core";
import cidToBlob from "../connections/cidToBlob";
import veridToCid from "../connections/veridToCid";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function installPlugin(
  dir: string,
  name: string,
  verid: number
): Promise<void> {
  const node = await IPFS.create();
  debug("IPFS node created");
  const cid = await veridToCid(verid);
  debug("CID retrieved");
  const blob = await cidToBlob(cid, node);
  debug("Blob retrieved");

  const modulePath = path.resolve(dir, `./modules/plugins/${name}.jar`);
  fse.writeFile(modulePath, Buffer.from(await blob.arrayBuffer()));
  fse.symlink(
    `../modules/plugins/${name}.jar`,
    path.resolve(dir, `./plugins/${name}.jar`)
  );
  debug("Plugin installed");
  await node.stop();
}
