import _ from 'lodash';
import parcer from './parsers.js';
import formate from './formatters/index.js';
import { readFile, getFormatName } from './helpers.js';

const createNode = (key, nodeType, item, children = []) => {
  const obj = {
    name: key,
    type: nodeType,
    value: item,
    children,
  }; return obj;
};

const compare = (obj1, obj2) => {
  const keysOfFirst = Object.keys(obj1);
  const keysOfSecond = Object.keys(obj2);
  const uniqSharedKeys = _.union(keysOfFirst, keysOfSecond);
  const keys = _.sortBy(uniqSharedKeys);
  const makeCompared = (acc, current) => {
    const makeNode = (key) => {
      const prevValue = obj1[key];
      const value = obj2[key];
      switch (true) {
        case ((_.isObject(prevValue)) && (_.isObject(value))):
          return [createNode(key, 'attachment', [], compare(prevValue, value))];
        case (prevValue === value):
          return [createNode(key, 'unchanged', value)];
        case (prevValue === undefined):
          return [createNode(key, 'added', value)];
        case (value === undefined):
          return [createNode(key, 'deleted', prevValue)];
        default: return [{
          name: key,
          type: 'updated',
          prevValue,
          newValue: value,
          children: [],
        }];
      }
    }; return _.concat(acc, makeNode(current));
  };
  return keys.reduce(makeCompared, []);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), getFormatName(filepath1));
  const obj2 = parcer(readFile(filepath2), getFormatName(filepath2));
  const vst = compare(obj1, obj2);
  return formate(vst, formatName);
};

export default genDiff;
