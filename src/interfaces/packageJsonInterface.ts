interface packageJson {
  name: string;
  version: string;
  type: string;
  server: {
    [key: string]: string;
  };
  scripts: {
    start: string;
  };
  dependencies: {
    [key: string]: string;
  };
  devDependencies: {
    [key: string]: string;
  };
}

export default packageJson;
