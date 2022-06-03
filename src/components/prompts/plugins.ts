import prompts from "prompts";
import pluginsNames from "../../connections/names";

export default async function promptPluginSearch(pluginName?: string) {
  const choices = await pluginsNames();
  if (pluginName === "" || pluginName === undefined) {
    const response = await prompts({
      type: "autocomplete",
      name: "value",
      message: "What is the name of plugin that you want to add?",
      choices,
      initial: 420,
    });
    return response.value;
  } else {
    const plugin = choices.find((plugin) => plugin.title === pluginName);
    if (plugin === undefined) {
      throw new Error(`Plugin ${pluginName} not found`);
    }
    return plugin.value;
  }
}
