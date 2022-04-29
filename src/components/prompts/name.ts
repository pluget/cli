import prompts from 'prompts';

export default function name() {
  return prompts({
    type: 'text',
    name: 'value',
    message: 'What is the name of your project?',
    initial: 'MyProject',
    validate: (value) => {
      if (value.length) {
        return true;
      }
      return 'Please enter a name';
    }
  });
};