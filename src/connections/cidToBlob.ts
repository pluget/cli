import { IPFS } from "ipfs-core";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function cidToBlob(cid: string, node: IPFS) {
  if (cid === null) {
    throw new Error("Invalid CID");
  }

  const stream = node.cat(cid);

  const bufferArr: Uint8Array[] = [];
  for await (const chunk of stream) {
    bufferArr.push(chunk);
  }

  debug(bufferArr);

  const blob = new Blob(bufferArr, { type: "application/octet-stream" });

  return blob;
}
