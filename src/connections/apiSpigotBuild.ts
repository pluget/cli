import axios from 'axios';
import { load } from 'cheerio';
import { isText } from 'domhandler';

async function getSpigotVersions() {
  const versionListWithDownloadLinks = new Map();
  await axios.get(`https://getbukkit.org/download/spigot`)
    .then(res => {
      const html = res.data;
      const $ = load(html);
      const versions = $("div.download-pane > div.row.vdivide > .col-sm-3 > h2");
      const versionList = new Array<string>();
      let i = 0
      for (let e of versions) {
        const child = e.children[0];
        if (isText(child)) {
          versionList.push(child.data);
        };
      }
      const downloadLinks = $("div.download-pane > div.row.vdivide > .col-sm-4 > .btn-group > a#downloadr");
      if (downloadLinks.length !== versionList.length || downloadLinks.length === 0) {
        throw new Error();
      }
      for (let i = 0; i < versionList.length; i++) {
        versionListWithDownloadLinks.set(versionList[i], downloadLinks[i].attribs.href);
      }
    })
    .catch(err => {
      if (err.response) {
        console.error("[Error] Spigot:", err.response.status, "wrong response from server");
      } else {
        console.error("[Error] Spigot: no response from server");
      }
    });
    return versionListWithDownloadLinks;
}

export default async function getSpigotBuildDownloadLink(version: string) {
  const versions = await getSpigotVersions();
  const downloadLink = versions.get(version);
  if (downloadLink === undefined) {
    console.log("[Warning] Spigot: version not found");
    return null;
  }
  return downloadLink
};