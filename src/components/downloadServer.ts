import { homedir } from "os";
import { resolve } from "path";
import fse from "fs-extra";

export default async function downloadServer(url: string, name: string) {
  const cacheFolder = resolve(homedir(), "./.cache/mpm");
  const serverFolder = resolve(cacheFolder, "./server");
  const ensureDirServerFolder = fse.ensureDir(serverFolder);

  const fetchUrl = fetch(url);

  const [, response] = await Promise.all([ensureDirServerFolder, fetchUrl]);
  const file = await response.blob();

  const filePath = resolve(serverFolder, `./${name}.jar`);
  fse
    .access(filePath)
    .then(() => {
      fse.rm(filePath);
    })
    .catch((err) => {
      return null;
    });
  await fse.ensureFile(filePath);
  const writeFile = fse.appendFile(
    filePath,
    Buffer.from(await file.arrayBuffer())
  );

  await writeFile;
  return filePath;
}
