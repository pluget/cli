import vers from 'minecraft-vers';

export default function () {
  const availableVersions = Object.entries(vers.Java.Release).filter(x => x[1][0].type === "release");
  const availableChoices = new Array();
  let i = 0;
  for (let e of availableVersions) {
    availableChoices.push({
      title: e[0],
      value: e[1],
      description: (i===0) ? "latest" : null
    });
    i++;
  };
  return availableChoices;
}