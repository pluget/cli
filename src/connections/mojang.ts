import axios from 'axios';

async function getVersions() {
  try {
    const response = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json');
    return response.data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getDownloadUrl(version: string) {
  try {
    const response = await axios.get(`https://launchermeta.mojang.com/mc/game/version_manifest_v2.json`);
    const versions = response.data.versions;
    const versionData = versions.find((v: { id: string; }) => v.id === version);
    if (!versionData) {
      throw new Error(`Version ${version} not found`);
    }
    const versionResponse = await axios.get(versionData.url);
    const downloadLink = versionResponse.data.downloads.server.url;
    return downloadLink;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export {getVersions, getDownloadUrl};