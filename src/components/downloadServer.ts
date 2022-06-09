import { homedir } from "os";
import { resolve } from "path";
import fse, { ensureDir } from "fs-extra";
import ProgressBar from "progress";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function downloadServer(
  url: string,
  name: string
): Promise<string> {
  const cacheFolder = resolve(homedir(), "./.cache/mpm");
  const serverFolder = resolve(cacheFolder, "./server");
  const ensureDirServerFolder = fse.ensureDir(serverFolder);

  var bar = new ProgressBar("[:bar] :percent :etas", {
    complete: "=",
    incomplete: " ",
    width: 40,
    total: 100,
  });
  bar.tick(0);
  const fetchUrl = fetch(url);

  const [, response] = await Promise.all([ensureDirServerFolder, fetchUrl]);
  const file = await response.blob();
  bar.tick(100);

  debug(typeof file);

  const filePath = resolve(serverFolder, `./${name}.jar`);
  debug(1);
  async function removeExistingServerFromCache() {
    try {
      await fse.access(filePath);
      await fse.rm(filePath);
      debug(5);
    } catch {
      debug(6);
    }
  }
  await removeExistingServerFromCache();
  debug(2);
  const writeFile = fse.appendFile(filePath, file);
  debug(3);

  await writeFile;
  debug(4);
  return filePath;
}
