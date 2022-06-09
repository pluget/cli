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

          read();

          function read() {
            reader
              .read()
              .then(({ done, value }) => {
                if (done) {
                  controller.close();
                  return;
                }
                loaded += value.byteLength;
                bar.tick(loaded / total);
                controller.enqueue(value);
                read();
              })
              .catch((error) => {
                console.error(error);
                controller.error(error);
              });
          }
        },
      })
    );
  }
  bar.tick(0);
  response = await responseProgress(response);
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
