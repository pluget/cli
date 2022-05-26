import fse from "fs-extra";
import path from "path";
import * as IPFS from "ipfs-core";
import cidToBlob from "../connections/cidToBlob";
import veridToCid from "../connections/veridToCid";

export default async function installPlugin(
  dir: string,
  name: string,
  verid: number
) {
  const node = await IPFS.create();
  const cid = await veridToCid(verid);
  const blob = await cidToBlob(cid, node);

  const modulePath = path.resolve(dir, `./modules/${name}.js`);
  fse.writeFile(modulePath, blob);
  fse.symlink(modulePath, path.resolve(dir, `./plugins/${name}`));
}
