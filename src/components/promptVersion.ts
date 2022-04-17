import prompts from 'prompts';
import versions from './availableVersions';

export default async function version() {
  const response = await prompts({
    type: 'autocomplete',
    name: 'value',
    message: 'Pick a version',
    choices: versions,
    initial: 0
  })
  return response.value[0].name;
};