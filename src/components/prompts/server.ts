import prompts from "prompts";
import { getDownloadUrl as papepGetDownloadUrl } from "../../connections/papermc";
import { getDownloadUrl as spigotGetDownloadUrl } from "../../connections/getbukkit";
import { getDownloadUrl as vanillaGetDownloadUrl } from "../../connections/mojang";

export default async function serverType(
  version: string
): Promise<{ val: string; download: string | null }> {
  const [paperDownload, spigotDownload, vanillaDownload] = await Promise.all([
    papepGetDownloadUrl(version),
    spigotGetDownloadUrl(version),
    vanillaGetDownloadUrl(version),
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
        disabled: paperDownload === null ? true : false,
      },
      {
        title: "Spigot",
        value: "spigot",
        disabled: spigotDownload === null ? true : false,
      },
      { title: "Bukkit", value: "bukkit", disabled: true },
      {
        title: "Vanilla",
        value: "vanilla",
        disabled: vanillaDownload === null ? true : false,
      },
    ],
    initial: 1,
  });

  switch (selectedServer.value) {
    case "paper":
      return { val: "paper", download: paperDownload };
    case "spigot":
      return { val: "spigot", download: spigotDownload };
    case "vanilla":
      return { val: "vanilla", download: vanillaDownload };
  }
  throw new Error("Server type not found");
}
