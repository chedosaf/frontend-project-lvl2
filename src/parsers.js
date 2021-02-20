import yaml from 'js-yaml';

const parcer = (file, expansion) => {
  let object = '';
  if (expansion === '.yml') {
    object = yaml.load(file);
  } if (expansion === '.json') {
    object = JSON.parse(file);
  }
  return object;
};

export default parcer;
