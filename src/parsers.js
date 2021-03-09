import yaml from 'js-yaml';
import path from 'path';
import readFile from './helpers.js';

const parser = (file) => {
  const expansion = path.extname(file);
  switch (true) {
    case (expansion === '.yml'):
      return yaml.load(readFile(file));
    case (expansion === '.json'):
      return JSON.parse(readFile(file));
    default:
      return null;
  }
};

export default parser;
