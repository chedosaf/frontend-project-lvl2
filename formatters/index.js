import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';
import genDiff from '../bin/main.js';

const format = {
  stylish: (a, b) => genDiff(a, b, formateStylish),
  plain: (a, b) => genDiff(a, b, formatePlain),
  json: (a, b) => genDiff(a, b, formateJson),
};

export default format;
