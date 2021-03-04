import path from 'path';
import _ from 'lodash';
import parcer from './parsers.js';
import readFile from './helpers.js';
import convertToFormate from './formatters/index.js';

const createSharedKeys = (obj1, obj2) => {
  try {
    const keysOfFirstObj = Object.keys(obj1);
    const keysOfSecondObj = Object.keys(obj2);
    const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
    const uniqSharedKeys = _.sortBy(Array.from(new Set(sharedKeys)));
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

const compare = (obj1, obj2, depthValue, parentValue) => {
  const keys = _.sortBy(createSharedKeys(obj1, obj2));
  const funcForReduce = (acc, corrent) => {
    const makeObj = (item) => {
      switch (true) {
        case ((_.isObject(obj1[item])) && (_.isObject(obj2[item]))):
          return [{
            name: item,
            path: parentValue,
            type: 'attachment',
            value: [],
            depth: depthValue,
            children: compare(obj1[item], obj2[item], depthValue + 1, _.concat(parentValue, item, ['.'])),
          }];
        case (obj1[item] === obj2[item]):
          return [{
            name: item,
            path: parentValue,
            type: 'unchanged',
            value: obj1[item],
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
          prevValue: obj1[item],
          newValue: obj2[item],
          depth: depthValue,
          children: [],
        }];
      }
    }; return _.concat(acc, makeObj(corrent));
  };
  return keys.reduce(funcForReduce, []);
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), path.extname(filepath1));
  const obj2 = parcer(readFile(filepath2), path.extname(filepath2));
  const vst = compare(obj1, obj2, 0, []);
  return convertToFormate(vst, formatName);
};

export default genDiff;
