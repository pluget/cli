import { IPFS } from "ipfs-core";

export default async function cidToBlob(cid: string, node: IPFS) {
  const stream = await node.cat(cid);

  const bufferArr: Uint8Array[] = new Array();
  for await (const chunk of stream) {
    bufferArr.push(chunk);
  }

  const blob = new Blob(bufferArr, { type: "application/octet-stream" });

  return blob;
}
