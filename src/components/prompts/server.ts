import prompts from "prompts";
import { getDownloadUrl as paperGetDownloadUrl } from "../../connections/papermc";
import {
  getSpigotDownloadUrl as spigotGetDownloadUrl,
  getBukkitDownloadUrl as bukkitGetDownloadUrl,
} from "../../connections/getbukkit";
import { getDownloadUrl as vanillaGetDownloadUrl } from "../../connections/mojang";

export default async function promptServerType(
  version: number
): Promise<{ val: string; download: string | null }> {
  const [paperDownload, spigotDownload, bukkitDownload, vanillaDownload] =
    await Promise.all([
      paperGetDownloadUrl(version.toString()),
      spigotGetDownloadUrl(version.toString()),
      bukkitGetDownloadUrl(version.toString()),
      vanillaGetDownloadUrl(version.toString()),
    ]);
  const selectedServer = await prompts({
    type: "select",
    name: "value",
    message: "Pick a server type",
    choices: [
      {
        title: "Glowstone",
        value: "glowstone",
        description: "fully open-source",
        disabled: true,
      },
      {
        title: "Paper",
        value: "paper",
        description: "recommended",
        disabled: paperDownload === null,
      },
      {
        title: "Spigot",
        value: "spigot",
        disabled: spigotDownload === null,
      },
      {
        title: "Bukkit",
        value: "bukkit",
        disabled: bukkitDownload === null,
      },
      {
        title: "Vanilla",
        value: "vanilla",
        disabled: vanillaDownload === null,
      },
    ],
    initial: 1,
  });

  switch (selectedServer.value) {
    case "paper":
      return { val: "paper", download: paperDownload };
    case "spigot":
      return { val: "spigot", download: spigotDownload };
    case "bukkit":
      return { val: "bukkit", download: bukkitDownload };
    case "vanilla":
      return { val: "vanilla", download: vanillaDownload };
  }
  throw new Error("Server type not found");
}
