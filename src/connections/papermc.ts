import axios from "axios";

async function getLatestBuild(version: string) {
  try {
    const response = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`)
    if (response.data.builds === undefined) {
      return null;
    }
    return response.data.builds[response.data.builds.length-1];
  } catch (err) {
    return null;
  };
}

export { getLatestBuild };