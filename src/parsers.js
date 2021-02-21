import yaml from 'js-yaml';

const parcer = (file, expansion) => {
  switch (expansion) {
    case '.yml':
      return yaml.load(file);
    case '.json':
      return JSON.parse(file);
    default:
      return console.error('Wrong Format!');
  }
};

export default parcer;
