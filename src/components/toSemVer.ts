export default async function toSemVer(version: string) {
  const [versionWithoutBuildMetadata, ...buildMetadata] = version.split("+");
  const [versionWithoutPreReleaseAndBuildMetadata, ...preRelease] =
    versionWithoutBuildMetadata.split("-");
  const [major, minor, patch, ...otherNumbers] =
    versionWithoutPreReleaseAndBuildMetadata.split(".");

  let result = `${major}.${minor || 0}.${patch || 0}`;

  if (otherNumbers.length > 0) {
    result += `-${otherNumbers.join(".")}`;
  }

  if (preRelease.length > 0) {
    result += `-${preRelease.join("-")}`;
  }

  if (buildMetadata.length > 0) {
    result += `+${buildMetadata.join("+")}`;
  }

  return result;
}
