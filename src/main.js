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

const createMassOfObjForVST = (content, depthValue = 0) => {
  const keys = _.sortBy(Object.keys(content));
  const processedContent = keys.reduce((prev, corrent) => {
    const makeObj = (item) => {
    //   if (_.isObject(content[item])) {
    //     const obj = {
    //       name: item,
    //       type: 'unchanged',
    //       value: [],
    //       depth: depthValue,
    //       children: createMassOfObjForVST(content[item], depthValue + 1),
    //     };
    //     return obj;
    //   } if (!_.isObject(content[corrent])) {
    //     const obj = {
    //       name: item,
    //       type: 'unchanged',
    //       value: content[item],
    //       depth: depthValue,
    //       children: [],
    //     };
    //     return obj;
    //   } return console.error('wrong value');
    // };
      switch (_.isObject(content[item])) {
        case true: {
          const obj = {
            name: item,
            type: 'unchanged',
            value: [],
            depth: depthValue,
            children: createMassOfObjForVST(content[item], depthValue + 1),
          };
          return obj;
        }
        case false: {
          const obj = {
            name: item,
            type: 'unchanged',
            value: content[item],
            depth: depthValue,
            children: [],
          };
          return obj;
        }
        default: {
          throw Error;
        }
      }
    }; return _.concat(prev, [makeObj(corrent)]);
  }, []);
  return processedContent;
};

const compare = (obj1, obj2, depthValue, parentValue) => {
  const keys = _.sortBy(createSharedKeys(obj1, obj2));
  const compared = keys.reduce((acc, corrent) => {
    const makeObj = (item) => {
      if ((obj1[item] !== undefined) && (obj2[item] !== undefined)) {
        if ((_.isObject(obj1[item])) && (_.isObject(obj2[item]))) {
          const obj = {
            name: item,
            path: parentValue,
            type: 'attachment',
            value: [],
            depth: depthValue,
            children: compare(obj1[item], obj2[item], depthValue + 1, _.concat(parentValue, item, ['.'])),
          };
          return [obj];
        } if ((!_.isObject(obj1[item])) || (!_.isObject(obj2[item]))) {
          if ((obj1[item] !== obj2[item])
          && ((obj2[item] !== undefined) && (obj2[item] !== undefined))) {
            if (!_.isObject(obj1[item]) && !_.isObject(obj2[item])) {
              const objForDelited = {
                name: item,
                path: parentValue,
                type: 'deleted',
                value: obj1[item],
                depth: depthValue,
                children: [],
              };
              const objForAdded = {
                name: item,
                path: parentValue,
                type: 'updated',
                value: obj2[item],
                prevValue: obj1[item],
                depth: depthValue,
                children: [],
              };
              return [objForDelited, objForAdded];
            } if (!_.isObject(obj1[item]) && _.isObject(obj2[item])) {
              const objForDelited = {
                name: item,
                path: parentValue,
                type: 'deleted',
                value: obj1[item],
                depth: depthValue,
                children: [],
              };
              const objForAdded = {
                name: item,
                path: parentValue,
                type: 'updated',
                value: [],
                prevValue: obj1[item],
                depth: depthValue,
                children: createMassOfObjForVST(obj2[item], depthValue + 1),
              };
              return [objForDelited, objForAdded];
            } if (_.isObject(obj1[item]) && !_.isObject(obj2[item])) {
              const objForDelited = {
                name: item,
                path: parentValue,
                type: 'deleted',
                value: [],
                depth: depthValue,
                children: createMassOfObjForVST(obj1[item], depthValue + 1),
              };
              const objForAdded = {
                name: item,
                path: parentValue,
                type: 'updated',
                value: obj2[item],
                prevValue: createMassOfObjForVST(obj1[item], depthValue + 1),
                depth: depthValue,
                children: [],
              };
              return [objForDelited, objForAdded];
            }
          } if (obj1[item] === obj2[item]) {
            const obj = {
              name: item,
              path: parentValue,
              type: 'unchanged',
              value: obj1[item],
              depth: depthValue,
              children: [],
            };
            return [obj];
          }
        }
      } if (obj1[item] === undefined) {
        if (_.isObject(obj2[item])) {
          const obj = {
            name: item,
            path: parentValue,
            type: 'added',
            value: [],
            depth: depthValue,
            children: createMassOfObjForVST(obj2[item], depthValue + 1),
          };
          return [obj];
        } if (!_.isObject(obj2[item])) {
          const obj = {
            name: item,
            path: parentValue,
            type: 'added',
            value: obj2[item],
            depth: depthValue,
            children: [],
          };
          return [obj];
        }
      } if (obj2[item] === undefined) {
        if (_.isObject(obj1[item])) {
          const obj = {
            name: item,
            path: parentValue,
            type: 'removed',
            value: [],
            depth: depthValue,
            children: createMassOfObjForVST(obj1[item], depthValue + 1),
          };
          return [obj];
        } if (!_.isObject(obj1[item])) {
          const obj = {
            name: item,
            path: parentValue,
            type: 'removed',
            value: obj1[item],
            depth: depthValue,
            children: [],
          };
          return [obj];
        }
      } throw Error;
    };
    return _.concat(acc, makeObj(corrent));
  }, []);
  return compared;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), path.extname(filepath1));
  const obj2 = parcer(readFile(filepath2), path.extname(filepath2));
  const vst = compare(obj1, obj2, 0, []);
  return convertToFormate(vst, formatName);
};

export default genDiff;
