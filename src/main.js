import formate from './formatters/index.js';
import compare from './createTree.js';
import { readFile, getFormatName } from './helpers.js';
import parcer from './parsers.js';

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), getFormatName(filepath1));
  const obj2 = parcer(readFile(filepath2), getFormatName(filepath2));
  const vst = compare(obj1, obj2);
  return formate(vst, formatName);
};

export default genDiff;
