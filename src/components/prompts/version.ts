import prompts from "prompts";

export default async function promptVersion(
  choices: {
    title: string;
    value: string;
    description?: string;
  }[],
  choice?: string
): Promise<string> {
  if (choice === undefined) {
    const version = await prompts({
      type: "autocomplete",
      name: "value",
      message: "Pick a version",
      choices,
      initial: 0,
    });
    return version.value.toString();
  } else if (choice === "latest") {
    return choices[choices.length - 1].value;
  } else {
    const version = choices.find(
      (version) => version.title.split("+")[0] === choice
    );
    if (version === undefined) {
      throw new Error(`Version ${choice} not found`);
    }
    return version.value;
  }
}
