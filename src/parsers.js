import yaml from 'js-yaml';
import readFile from './helpers.js';

const parsers = {
  '.yml': (a) => yaml.load(readFile(a)),
  '.json': (a) => JSON.parse(readFile(a)),
};

const parser = (filepath, format) => parsers[format](filepath);

export default parser;
