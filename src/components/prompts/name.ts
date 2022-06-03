import prompts from "prompts";

export default function promptName() {
  return prompts({
    type: "text",
    name: "value",
    message: "What is the name of your server?",
    initial: "my-mpm-server",
  });
}
