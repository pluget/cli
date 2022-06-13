import { IPFS } from "ipfs-core";

export default async function cidToBlob(cid: string, node: IPFS) {
  if (cid === null) {
    throw new Error("Invalid CID (null)");
  }

  const stream = node.cat(cid);

  const arr = [];
  for await (const i of stream) arr.push(i);

  const blob = new Blob(arr, { type: "application/octet-stream" });

  return blob;
}
