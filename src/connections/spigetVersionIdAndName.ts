import axios from "axios";

interface SpigetVersion {
  id: number;
  name: string;
  resource: number;
  releaseDate: number;
  rating: {
    count: number;
    average: number;
  };
  downloads: number;
  uuid: string;
}

export default async function spigetVersionIdAndName(
  id: number
): Promise<SpigetVersion[]> {
  const versions = await axios.get(
    `https://api.spiget.org/v2/resources/${id}/versions?size=9999`
  );
  return versions.data;
}
