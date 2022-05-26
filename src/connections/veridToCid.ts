import fse from "fs-extra";
import path from "path";

export default async function veridToCid(verid: number) {
  const verids: { [key: string]: string } = await fse.readJSON(
    path.resolve(__dirname, "../../repository/repository/verid.json")
  );
  return verids[verid];
}
