import _ from 'lodash';
import parcer from './parsers.js';
import formate from './formatters/index.js';
import { readFile, getFormatName } from './helpers.js';

const compare = (obj1, obj2) => {
  const uniqSharedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqSharedKeys);
  const makeNode = (key) => {
    const [prevValue, value] = [obj1[key], obj2[key]];
    switch (true) {
      case ((_.isObject(prevValue)) && (_.isObject(value))):
        return { key, type: 'attachment', children: compare(prevValue, value) };
      case (prevValue === value):
        return { key, type: 'unchanged', value };
      case (prevValue === undefined):
        return { key, type: 'added', value };
      case (value === undefined):
        return { key, type: 'deleted', value: prevValue };
      default: return {
        key,
        type: 'updated',
        prevValue,
        value,
      };
    }
  };
  return sortedKeys.map(makeNode);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), getFormatName(filepath1));
  const obj2 = parcer(readFile(filepath2), getFormatName(filepath2));
  const vst = compare(obj1, obj2);
  return formate(vst, formatName);
};

export default genDiff;
