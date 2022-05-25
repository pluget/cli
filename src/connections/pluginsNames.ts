import fse from "fs-extra";
import path from "path";

export default async function name() {
  const names: { [key: string]: { spigot: number } } = await fse.readJSON(
    path.join(__dirname, "../../repository/repository/name.json")
  );
  const response: {
    title: string;
    value: number;
  }[] = new Array();
  for (const name in names) {
    response.push({
      title: name,
      value: names[name].spigot,
    });
  }
  return response;
}
