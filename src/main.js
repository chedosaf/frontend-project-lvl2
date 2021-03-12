import _ from 'lodash';
import path from 'path';
import parcer from './parsers.js';
import formate from './formatters/index.js';
import readFile from './helpers.js';

const createSharedKeys = (obj1, obj2) => {
  try {
    const keysOfFirstObj = Object.keys(obj1);
    const keysOfSecondObj = Object.keys(obj2);
    const uniqSharedKeys = _.union(keysOfFirstObj, keysOfSecondObj);
    return uniqSharedKeys;
  } catch (e) {
    return () => { throw new Error(); };
  }
};

const makeSimpleObj = (key, parentValue, itemType, item, depthValue) => {
  const obj = {
    name: key,
    path: parentValue,
    type: itemType,
    value: item[key],
    depth: depthValue,
    children: [],
  }; return obj;
};

const compare = (obj1, obj2, depthValue = 0, parentValue = []) => {
  const keys = _.sortBy(createSharedKeys(obj1, obj2));
  const funcForReduce = (acc, corrent) => {
    const makeObj = (item) => {
      const value1 = obj1[item];
      const value2 = obj2[item];
      switch (true) {
        case ((_.isObject(value1)) && (_.isObject(value2))):
          return [{
            name: item,
            path: parentValue,
            type: 'attachment',
            value: [],
            depth: depthValue,
            children: compare(value1, value2, depthValue + 1, _.concat(parentValue, item, ['.'])),
          }];
        case (obj1[item] === obj2[item]):
          return [{
            name: item,
            path: parentValue,
            type: 'unchanged',
            value: value1,
            depth: depthValue,
            children: [],
          }];
        case (obj1[item] === undefined):
          return [makeSimpleObj(item, parentValue, 'added', obj2, depthValue)];
        case (obj2[item] === undefined):
          return [makeSimpleObj(item, parentValue, 'deleted', obj1, depthValue)];
        default: return [{
          name: item,
          path: parentValue,
          type: 'updated',
          prevValue: value1,
          newValue: value2,
          depth: depthValue,
          children: [],
        }];
      }
    }; return _.concat(acc, makeObj(corrent));
  };
  return keys.reduce(funcForReduce, []);
};

const getFormatName = (filepath) => path.extname(filepath).slice(1);

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), getFormatName(filepath1));
  const obj2 = parcer(readFile(filepath2), getFormatName(filepath2));
  const vst = compare(obj1, obj2);
  return formate(vst, formatName);
};

export default genDiff;
