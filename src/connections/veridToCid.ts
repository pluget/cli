import fse from "fs-extra";
import { resolve } from "path";

export default async function veridToCid(
  verid: number
): Promise<string | null> {
  const verids: { [key: number]: string | null } = await fse.readJSON(
    resolve(__dirname, "../../repository/verid.json")
  );
  return verids[verid];
}
