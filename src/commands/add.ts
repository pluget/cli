import pluginSearch from "../components/prompts/pluginSearch";
import createDebugMessages from "debug";
const debug = createDebugMessages("choices");

export default async function add(pluginName: string) {
  const pluginId = await pluginSearch(pluginName);
  debug(pluginId);
}
