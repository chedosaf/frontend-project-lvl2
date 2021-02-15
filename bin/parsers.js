import yaml from 'js-yaml';
import path from 'path';
import { readFile } from './helpers.js';

const parcer = (filepath) => {
  const expansion = path.extname(filepath);
  const file = readFile(filepath);
  let object = '';
  if (expansion === '.yml') {
    object = yaml.load(file);
  } if (expansion === '.json') {
    object = JSON.parse(file);
  }
  return object;
};

export default parcer;

console.log(typeof (parcer('./__fixtures__/after.yml')));
