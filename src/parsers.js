import yaml from 'js-yaml';
import path from 'path';
import readFile from './helpers.js';

const parser = (file) => {
  const expansion = path.extname(file);
  if (expansion === '.yml') {
    return yaml.load(readFile(file));
  } if (expansion === '.json') {
    return JSON.parse(readFile(file));
  } throw Error('Wrong Format');
};

export default parser;
