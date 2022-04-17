import axios from 'axios';

export default async function apiVanillaBuildApiLink(version: string) {
  return await axios.get("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json")
    .then(res => {
      const versions = res.data.versions;
      const versionData = versions.find((x: { id: string; type: string;}) => x.id === version);
      if (versionData) {
        return versionData.url;
      } else {
        console.log("[Warning] Vanilla: Version not found.");
        return null;
      }
    })
    .catch(err => {
      if (err.response) {
        console.error("[Error] Vanilla:", err.response.status, "wrong response from server");
      } else {
        console.error("[Error] Vanilla: no response from server");
      }
      return null;
    })
};