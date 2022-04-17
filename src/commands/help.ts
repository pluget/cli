export default async function help(command?: string) {
  console.info("Minecraft Command Line Interface (mcli)");
  console.info("Usage: mcli [command] [flags]");
  console.info("Commands:");
  console.info(" - add: Add a new plugin to package.json");
  console.info(" - init: Initialize a new mcli project");
  console.info(" - install: Install server and all plugins");
  console.info(" - help: Show this help message");
  console.info("Run 'mcli help [command]' for more information on specific command");
}