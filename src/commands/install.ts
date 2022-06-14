import installServer from "../components/installServer";

export default async function install(path: string) {
  await installServer(path);
}