// scraping; not official api

import axios from "axios";
import { load } from "cheerio";
import { isText } from "domhandler";
import log from "loglevel";

async function getVersionsWithDownloadUrlMap(serverType: string) {
  const versionListWithDownloadLinks = new Map();
  try {
    const res = await axios.get(`https://getbukkit.org/download/${serverType}`);
    const html = res.data;
    const $ = load(html);
    const versions = $("div.download-pane > div.row.vdivide > .col-sm-3 > h2");
    const versionList = new Array<string>();
    for (const e of versions) {
      const child = e.children[0];
      if (isText(child)) {
        versionList.push(child.data);
      }
    }
    for (const item of versionList) {
      versionListWithDownloadLinks.set(
        item,
        `https://download.getbukkit.org/${serverType}/${serverType}-${item}.jar`
      );
    }
  } catch (err) {
    log.error(`GetBukkit.org: Problem with response from server. ${err}`);
  }
  return versionListWithDownloadLinks;
}

async function getSpigotDownloadUrl(version: string) {
  const gotSpigotVersions = await getVersionsWithDownloadUrlMap("spigot");
  const downloadUrl = gotSpigotVersions.get(version);
  if (downloadUrl === undefined) {
    return null;
  }
  return downloadUrl;
}

async function getBukkitDownloadUrl(version: string) {
  const gotBukkitVersions = await getVersionsWithDownloadUrlMap("craftbukkit");
  const downloadUrl = gotBukkitVersions.get(version);
  if (downloadUrl === undefined) {
    return null;
  }
  return downloadUrl;
}

export { getSpigotDownloadUrl, getBukkitDownloadUrl };
