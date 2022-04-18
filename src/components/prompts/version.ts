import prompts from 'prompts';
import versions from '../versions';

export default async function promptVersion() {
  const choices = await versions('release');
  const response = await prompts({
    type: 'autocomplete',
    name: 'value',
    message: 'Pick a version',
    choices,
    initial: 0
  })
  return response.value;
};