import { getVersions } from "../connections/mojang";

export default async function versionChoices(type: string) {
  const gotVersions = await getVersions();
  const versions = gotVersions.versions.filter((x: { type: string; }) => x.type === type);
  return versions.map((x: { id: string; }) => {
    return {
      title: x.id,
      value: x.id,
      description: (x.id === gotVersions.latest[type]) ? "latest" : ""
    }
  });
}