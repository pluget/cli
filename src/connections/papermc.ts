import axios from "axios";

async function getLatestBuild(version: string): Promise<number | null> {
  try {
    const response = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`)
    if (response.data.builds === undefined) {
      return null;
    }
    return response.data.builds.at(-1);
  } catch (err) {
    return null;
  };
}

async function getDownloadUrlForSpecificBuild(version: string, build: number): Promise<string | null> {
  try {
    const response = await axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${build}`)
    return `https://papermc.io/api/v2/projects/paper/versions/${version}/builds/${build}/` + response.data.downloads.application.name;
  } catch (err) {
    return null;
  };
}

async function getDownloadUrl(version: string): Promise<string | null> {
  const build = await getLatestBuild(version);
  if (build === null) {
    return null;
  }
  return getDownloadUrlForSpecificBuild(version, build);
}

export { getDownloadUrl };