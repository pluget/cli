import fse from "fs-extra";
import { join, resolve } from "path";
import createDebugMessages from "debug";
const debug = createDebugMessages("choices");
import promptName from "../components/prompts/name";
import promptVersion from "../components/prompts/version";
import promptServer from "../components/prompts/server";
import createServer from "../components/createServer";
import versions from "../components/versions";

export default async function init(path: string): Promise<void> {
  const availableVersions = versions("release");
  const parentDir = resolve(process.cwd(), path);

  try {
    await fse.access(parentDir);
  } catch (err) {
    throw new Error(`The directory ${parentDir} does not exist.`);
  }

  const serverName = await promptName();

  const dir = join(parentDir, serverName.value);

  fse.access(dir, (err) => {
    if (!err) {
      throw new Error(`Directory ${dir} already exists.`);
    }
  });

  const selectedVersion = await promptVersion(await availableVersions);
  debug(selectedVersion);
  const serverTypeAndDownload = await promptServer(selectedVersion);
  debug(serverTypeAndDownload.val);
  debug(serverTypeAndDownload.download || "");

  await createServer(
    path,
    serverName.value,
    serverTypeAndDownload.download || "",
    serverTypeAndDownload.val,
    selectedVersion
  );
}
