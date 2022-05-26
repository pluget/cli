import axios from "axios";

export default async function spigetVersionIdAndName(id: number) {
  const versions = await axios.get(
    `https://api.spiget.org/v2/resources/${id}/versions?size=9999`
  );
  return versions;
}
