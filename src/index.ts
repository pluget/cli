import version from './components/promptVersion';
import server from './components/promptServer';

async function prompt() {
  await server(await version());
};

prompt();