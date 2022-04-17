import axios from "axios";

export default async function getPaperBuildNumber(version: string) {
  return axios.get(`https://papermc.io/api/v2/projects/paper/versions/${version}`)
    .then(res => {
      return res.data.builds[res.data.builds.length-1];
    })
    .catch(err => {
      if (err.response) {
        console.warn("[Warning] Paper:", err.response.status, err.response.data.error);
      } else {
        console.error("[Error] Paper: no response from server");
      }
      return null;
    });
}