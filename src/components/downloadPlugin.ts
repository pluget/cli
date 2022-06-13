import cidToBlob from "../connections/cidToBlob";
import veridToCid from "../connections/veridToCid";
import createDebugMessage from "debug";
import { IPFS } from "ipfs-core";
const debug = createDebugMessage("debugging");

export default async function downloadPlugin(
  verid: number,
  node: IPFS
): Promise<Blob> {
  const cid = await veridToCid(verid);
  debug("CID retrieved");
  const blob = await cidToBlob(cid, node);
  debug("Blob retrieved");
  return blob;
}
