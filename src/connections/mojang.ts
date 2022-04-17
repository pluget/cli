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


export {getVersions};