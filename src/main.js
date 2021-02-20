import path from 'path';
import _ from 'lodash';
import parcer from './parsers.js';
import { isObject, readFile } from './helpers.js';
import convertToFormate from './formatters/index.js';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = _.sortedUniq(Array.from(new Set(sharedKeys)));
  return uniqSharedKeys;
};

const createMassOfObjForVST = (content, depthValue = 0) => {
  const processedContent = [];
  const keys = _.sortBy(Object.keys(content));
  keys.forEach((iter) => {
    if (isObject(content[iter])) {
      const obj = {};
      obj.name = iter;
      obj.type = 'unchanged';
      obj.value = [];
      obj.depth = depthValue;
      obj.children = createMassOfObjForVST(content[iter], depthValue + 1);
      processedContent.push(obj);
    } else {
      const obj = {};
      obj.name = iter;
      obj.type = 'unchanged';
      obj.value = content[iter];
      obj.depth = depthValue;
      obj.children = [];
      processedContent.push(obj);
    }
  });
  return processedContent;
};

const compare = (obj1, obj2, depthValue) => {
  const compared = [];
  const keys = _.sortBy(createSharedKeys(obj1, obj2));
  keys.forEach((iter) => {
    if ((obj1[iter] !== undefined) && (obj2[iter] !== undefined)) {
      if ((isObject(obj1[iter])) && (isObject(obj2[iter]))) {
        const obj = {};
        obj.name = iter;
        obj.type = 'unchanged';
        obj.value = [];
        obj.depth = depthValue;
        obj.children = compare(obj1[iter], obj2[iter], depthValue + 1);
        compared.push(obj);
      } else {
        if ((obj1[iter] !== obj2[iter])
        && ((obj2[iter] !== undefined) && (obj2[iter] !== undefined))) {
          if (!isObject(obj1[iter]) && !isObject(obj2[iter])) {
            const objForDelited = {};
            objForDelited.name = iter;
            objForDelited.type = 'deleted';
            objForDelited.value = obj1[iter];
            objForDelited.depth = depthValue;
            objForDelited.children = [];
            compared.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[iter];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
            compared.push(objForAdded);
          } if (!isObject(obj1[iter]) && isObject(obj2[iter])) {
            const objForDelited = {};
            objForDelited.name = iter;
            objForDelited.type = 'deleted';
            objForDelited.value = obj1[iter];
            objForDelited.depth = depthValue;
            objForDelited.children = [];
            compared.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = [];
            objForAdded.depth = depthValue;
            objForAdded.children = createMassOfObjForVST(obj2[iter], depthValue + 1);
            compared.push(objForAdded);
          } if (isObject(obj1[iter]) && !isObject(obj2[iter])) {
            const objForDelited = {};
            objForDelited.name = iter;
            objForDelited.type = 'deleted';
            objForDelited.value = [];
            objForDelited.depth = depthValue;
            objForDelited.children = createMassOfObjForVST(obj1[iter], depthValue + 1);
            compared.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[iter];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
            compared.push(objForAdded);
          }
        } if (obj1[iter] === obj2[iter]) {
          const obj = {};
          obj.name = iter;
          obj.type = 'unchanged';
          obj.value = obj1[iter];
          obj.depth = depthValue;
          obj.children = [];
          compared.push(obj);
        }
      }
    } if (obj1[iter] === undefined) {
      if (isObject(obj2[iter])) {
        const objForAdded = {};
        objForAdded.name = iter;
        objForAdded.type = 'added';
        objForAdded.value = [];
        objForAdded.depth = depthValue;
        objForAdded.children = createMassOfObjForVST(obj2[iter], depthValue + 1);
        compared.push(objForAdded);
      } else {
        const objForAdded = {};
        objForAdded.name = iter;
        objForAdded.type = 'added';
        objForAdded.value = obj2[iter];
        objForAdded.depth = depthValue;
        objForAdded.children = [];
        compared.push(objForAdded);
      }
    } if (obj2[iter] === undefined) {
      if (isObject(obj1[iter])) {
        const objForDelited = {};
        objForDelited.name = iter;
        objForDelited.type = 'removed';
        objForDelited.value = [];
        objForDelited.depth = depthValue;
        objForDelited.children = createMassOfObjForVST(obj1[iter], depthValue + 1);
        compared.push(objForDelited);
      } else {
        const objForDelited = {};
        objForDelited.name = iter;
        objForDelited.type = 'removed';
        objForDelited.value = obj1[iter];
        objForDelited.depth = depthValue;
        objForDelited.children = [];
        compared.push(objForDelited);
      }
    }
  });
  return compared;
};

const genDiff = (filepath1, filepath2, formatName) => {
  const obj1 = parcer(readFile(filepath1), path.extname(filepath1));
  const obj2 = parcer(readFile(filepath2), path.extname(filepath2));
  const vst = compare(obj1, obj2, 0);
  return convertToFormate(vst, formatName);
};

export default genDiff;
