import prompts from "prompts";

export default async function promptPluginSearch(
  pluginNames: { title: string; value: number }[],
  pluginName?: string
): Promise<number> {
  if (pluginName === "" || pluginName === undefined) {
    const response = await prompts({
      type: "autocomplete",
      name: "value",
      message: "What is the name of plugin that you want to add?",
      choices: pluginNames,
      initial: 420,
    });
    return response.value;
  } else {
    const plugin = pluginNames.find((plugin) => plugin.title === pluginName);
    if (plugin === undefined) {
      throw new Error(`Plugin ${pluginName} not found`);
    }
    return plugin.value;
  }
}
