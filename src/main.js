import path from 'path';
import _ from 'lodash';
import parcer from './parsers.js';
import { readFile } from './helpers.js';
import convertToFormate from './formatters/index.js';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = _.sortBy(Array.from(new Set(sharedKeys)));
  return uniqSharedKeys;
};

const createMassOfObjForVST = (content, depthValue = 0) => {
  const keys = _.sortBy(Object.keys(content));
  const processedContent = keys.reduce((prev, corrent) => {
    const obj = {};
    if (_.isObject(content[corrent])) {
      obj.name = corrent;
      obj.type = 'unchanged';
      obj.value = [];
      obj.depth = depthValue;
      obj.children = createMassOfObjForVST(content[corrent], depthValue + 1);
    } if (!_.isObject(content[corrent])) {
      obj.name = corrent;
      obj.type = 'unchanged';
      obj.value = content[corrent];
      obj.depth = depthValue;
      obj.children = [];
    }
    return _.concat(prev, [obj]);
  }, []);
  return processedContent;
};

const compare = (obj1, obj2, depthValue) => {
  const keys = _.sortBy(createSharedKeys(obj1, obj2));
  // const compared = [];
  // keys.forEach((iter) => {
  //   if ((obj1[iter] !== undefined) && (obj2[iter] !== undefined)) {
  //     if ((_.isObject(obj1[iter])) && (_.isObject(obj2[iter]))) {
  //       const obj = {};
  //       obj.name = iter;
  //       obj.type = 'unchanged';
  //       obj.value = [];
  //       obj.depth = depthValue;
  //       obj.children = compare(obj1[iter], obj2[iter], depthValue + 1);
  //       compared.push(obj);
  //     } else {
  //       if ((obj1[iter] !== obj2[iter])
  //       && ((obj2[iter] !== undefined) && (obj2[iter] !== undefined))) {
  //         if (!_.isObject(obj1[iter]) && !_.isObject(obj2[iter])) {
  //           const objForDelited = {};
  //           objForDelited.name = iter;
  //           objForDelited.type = 'deleted';
  //           objForDelited.value = obj1[iter];
  //           objForDelited.depth = depthValue;
  //           objForDelited.children = [];
  //           compared.push(objForDelited);
  //           const objForAdded = {};
  //           objForAdded.name = iter;
  //           objForAdded.type = 'updated';
  //           objForAdded.value = obj2[iter];
  //           objForAdded.depth = depthValue;
  //           objForAdded.children = [];
  //           compared.push(objForAdded);
  //         } if (!_.isObject(obj1[iter]) && _.isObject(obj2[iter])) {
  //           const objForDelited = {};
  //           objForDelited.name = iter;
  //           objForDelited.type = 'deleted';
  //           objForDelited.value = obj1[iter];
  //           objForDelited.depth = depthValue;
  //           objForDelited.children = [];
  //           compared.push(objForDelited);
  //           const objForAdded = {};
  //           objForAdded.name = iter;
  //           objForAdded.type = 'updated';
  //           objForAdded.value = [];
  //           objForAdded.depth = depthValue;
  //           objForAdded.children = createMassOfObjForVST(obj2[iter], depthValue + 1);
  //           compared.push(objForAdded);
  //         } if (_.isObject(obj1[iter]) && !_.isObject(obj2[iter])) {
  //           const objForDelited = {};
  //           objForDelited.name = iter;
  //           objForDelited.type = 'deleted';
  //           objForDelited.value = [];
  //           objForDelited.depth = depthValue;
  //           objForDelited.children = createMassOfObjForVST(obj1[iter], depthValue + 1);
  //           compared.push(objForDelited);
  //           const objForAdded = {};
  //           objForAdded.name = iter;
  //           objForAdded.type = 'updated';
  //           objForAdded.value = obj2[iter];
  //           objForAdded.depth = depthValue;
  //           objForAdded.children = [];
  //           compared.push(objForAdded);
  //         }
  //       } if (obj1[iter] === obj2[iter]) {
  //         const obj = {};
  //         obj.name = iter;
  //         obj.type = 'unchanged';
  //         obj.value = obj1[iter];
  //         obj.depth = depthValue;
  //         obj.children = [];
  //         compared.push(obj);
  //       }
  //     }
  //   } if (obj1[iter] === undefined) {
  //     if (_.isObject(obj2[iter])) {
  //       const objForAdded = {};
  //       objForAdded.name = iter;
  //       objForAdded.type = 'added';
  //       objForAdded.value = [];
  //       objForAdded.depth = depthValue;
  //       objForAdded.children = createMassOfObjForVST(obj2[iter], depthValue + 1);
  //       compared.push(objForAdded);
  //     } else {
  //       const objForAdded = {};
  //       objForAdded.name = iter;
  //       objForAdded.type = 'added';
  //       objForAdded.value = obj2[iter];
  //       objForAdded.depth = depthValue;
  //       objForAdded.children = [];
  //       compared.push(objForAdded);
  //     }
  //   } if (obj2[iter] === undefined) {
  //     if (_.isObject(obj1[iter])) {
  //       const objForDelited = {};
  //       objForDelited.name = iter;
  //       objForDelited.type = 'removed';
  //       objForDelited.value = [];
  //       objForDelited.depth = depthValue;
  //       objForDelited.children = createMassOfObjForVST(obj1[iter], depthValue + 1);
  //       compared.push(objForDelited);
  //     } else {
  //       const objForDelited = {};
  //       objForDelited.name = iter;
  //       objForDelited.type = 'removed';
  //       objForDelited.value = obj1[iter];
  //       objForDelited.depth = depthValue;
  //       objForDelited.children = [];
  //       compared.push(objForDelited);
  //     }
  //   }
  // });
  const isEmty = (a, b, c) => {
    const d = [];
    if (JSON.stringify(a) !== '{}') {
      return _.concat(d, a);
    } if (JSON.stringify(b) !== '{}' && JSON.stringify(c) !== '{}') {
      return _.concat(d, b, c);
    } if (JSON.stringify(b) === '{}' && JSON.stringify(c) !== '{}') {
      return _.concat(d, c);
    } if (JSON.stringify(b) !== '{}' && JSON.stringify(c) === '{}') {
      return _.concat(d, b);
    } return console.error('no arg');
  };
  const compared = keys.reduce((acc, corrent) => {
    // const compare = [];
    const obj = {};
    const objForDelited = {};
    const objForAdded = {};
    if ((obj1[corrent] !== undefined) && (obj2[corrent] !== undefined)) {
      if ((_.isObject(obj1[corrent])) && (_.isObject(obj2[corrent]))) {
        obj.name = corrent;
        obj.type = 'unchanged';
        obj.value = [];
        obj.depth = depthValue;
        obj.children = compare(obj1[corrent], obj2[corrent], depthValue + 1);
        _.concat(compare, [obj]);
      } else {
        if ((obj1[corrent] !== obj2[corrent])
        && ((obj2[corrent] !== undefined) && (obj2[corrent] !== undefined))) {
          if (!_.isObject(obj1[corrent]) && !_.isObject(obj2[corrent])) {
            objForDelited.name = corrent;
            objForDelited.type = 'deleted';
            objForDelited.value = obj1[corrent];
            objForDelited.depth = depthValue;
            objForDelited.children = [];
            objForAdded.name = corrent;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[corrent];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
          } if (!_.isObject(obj1[corrent]) && _.isObject(obj2[corrent])) {
            objForDelited.name = corrent;
            objForDelited.type = 'deleted';
            objForDelited.value = obj1[corrent];
            objForDelited.depth = depthValue;
            objForDelited.children = [];
            objForAdded.name = corrent;
            objForAdded.type = 'updated';
            objForAdded.value = [];
            objForAdded.depth = depthValue;
            objForAdded.children = createMassOfObjForVST(obj2[corrent], depthValue + 1);
          } if (_.isObject(obj1[corrent]) && !_.isObject(obj2[corrent])) {
            objForDelited.name = corrent;
            objForDelited.type = 'deleted';
            objForDelited.value = [];
            objForDelited.depth = depthValue;
            objForDelited.children = createMassOfObjForVST(obj1[corrent], depthValue + 1);
            objForAdded.name = corrent;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[corrent];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
          }
        } if (obj1[corrent] === obj2[corrent]) {
          obj.name = corrent;
          obj.type = 'unchanged';
          obj.value = obj1[corrent];
          obj.depth = depthValue;
          obj.children = [];
        }
      }
    } if (obj1[corrent] === undefined) {
      if (_.isObject(obj2[corrent])) {
        objForAdded.name = corrent;
        objForAdded.type = 'added';
        objForAdded.value = [];
        objForAdded.depth = depthValue;
        objForAdded.children = createMassOfObjForVST(obj2[corrent], depthValue + 1);
      } else {
        objForAdded.name = corrent;
        objForAdded.type = 'added';
        objForAdded.value = obj2[corrent];
        objForAdded.depth = depthValue;
        objForAdded.children = [];
      }
    } if (obj2[corrent] === undefined) {
      if (_.isObject(obj1[corrent])) {
        objForDelited.name = corrent;
        objForDelited.type = 'removed';
        objForDelited.value = [];
        objForDelited.depth = depthValue;
        objForDelited.children = createMassOfObjForVST(obj1[corrent], depthValue + 1);
      } else {
        objForDelited.name = corrent;
        objForDelited.type = 'removed';
        objForDelited.value = obj1[corrent];
        objForDelited.depth = depthValue;
        objForDelited.children = [];
      }
    } return _.concat(acc, isEmty(obj, objForDelited, objForAdded));
  }, []);
  return compared;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), path.extname(filepath1));
  const obj2 = parcer(readFile(filepath2), path.extname(filepath2));
  const vst = compare(obj1, obj2, 0);
  return convertToFormate(vst, formatName);
};

export default genDiff;
