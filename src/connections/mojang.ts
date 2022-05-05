import axios from 'axios';
import log from 'loglevel';

async function getVersions() {
  try {
    const response = await axios.get('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json');
    return response.data;
  } catch (err) {
    log.error(err);
    return null;
  }
}

async function getDownloadUrl(version: string) {
  try {
    const response = await axios.get(`https://launchermeta.mojang.com/mc/game/version_manifest_v2.json`);
    const versions = response.data.versions;
    const versionData = versions.find((v: { id: string; }) => v.id === version);
    if (versionData === undefined || versionData.url === undefined) {
      log.error(`Vanilla: Version ${version} not found`);
      return null;
    }
    const versionResponse = await axios.get(versionData.url);
    if (versionResponse.data.downloads === undefined || versionResponse.data.downloads.server === undefined) {
      return null;
    }
    const downloadLink = versionResponse.data.downloads.server.url;
    return downloadLink;
  } catch (err) {
    log.error(err);
    return null;
  }
}

export { getVersions, getDownloadUrl };