import { homedir } from "os";
import { resolve } from "path";
import fse from "fs-extra";
import cliProgress from "cli-progress";
import createDebugMessages from "debug";
const debug = createDebugMessages("debugging");

export default async function downloadServer(
  url: string,
  name: string
): Promise<string> {
  const cacheFolder = resolve(homedir(), "./.cache/mpm");
  const serverCacheFolder = resolve(cacheFolder, "./server");
  const ensureDirServerFolder = fse.ensureDir(serverCacheFolder);

  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const fetchUrl = fetch(url);
  let [, response] = await Promise.all([ensureDirServerFolder, fetchUrl]);

  async function responseProgress(response: Response) {
    const contentEncoding = response.headers.get("content-encoding");
    const contentLength = response.headers.get(
      contentEncoding ? "x-file-size" : "content-length"
    );
    if (contentLength === null) {
      throw Error("Response size header unavailable");
    }

    const total = parseInt(contentLength, 10);
    let loaded = 0;

    return new Response(
      new ReadableStream({
        start(controller) {
          if (response.body === null) {
            return null;
          }
          const reader = response.body.getReader();

          async function read(): Promise<void> {
            try {
              const { done, value } = await reader.read();
              if (done) {
                controller.close();
                return;
              }
              loaded += value.byteLength;
              bar.update(Math.round((loaded / total) * 10000) / 100);
              controller.enqueue(value);

              read().catch((err) => {
                throw err;
              });
            } catch (err) {
              controller.error(err);
              throw err;
            }
          }

          Promise.all([read()]).catch((err) => {
            throw err;
          });
        },
      })
    );
  }
  bar.start(100, 0);
  response = await responseProgress(response);
  const file = await response.blob();
  bar.stop();

  debug(typeof file);

  const filePath = resolve(serverCacheFolder, `./${name}.jar`);
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
  const writeFile = await fse.appendFile(
    filePath,
    Buffer.from(await file.arrayBuffer())
  );
  debug(3);

  await writeFile;
  debug(4);
  return filePath;
}
