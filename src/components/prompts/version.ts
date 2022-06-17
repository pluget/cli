import prompts from "prompts";

export default async function promptVersion(
  choices: {
    title: string;
    value: number;
    disabled: boolean;
    description?: string;
  }[],
  choice?: string
): Promise<number> {
  if (choice === undefined) {
    const version = await prompts({
      type: "select",
      name: "value",
      message: "Pick a version",
      choices,
      initial: 0,
    });
    return version.value;
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
