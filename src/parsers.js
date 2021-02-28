import yaml from 'js-yaml';

const parser = (file, expansion) => {
  if (expansion === '.yml') {
    return yaml.load(file);
  } if (expansion === '.json') {
    return JSON.parse(file);
  } throw Error('Wrong Format');
};

export default parser;
