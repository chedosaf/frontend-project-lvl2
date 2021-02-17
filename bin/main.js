import parcer from './parsers.js';
import { isObject } from './helpers.js';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = Array.from(new Set(sharedKeys));
  return uniqSharedKeys.sort();
};

const createMassOfOjForVST = (file, depthValue = 0) => {
  const mass = [];
  const keys = Object.keys(file).sort();
  keys.forEach((iter) => {
    if (isObject(file[iter])) {
      const obj = {};
      obj.name = iter;
      obj.type = 'unchanged';
      obj.value = [];
      obj.depth = depthValue;
      obj.children = createMassOfOjForVST(file[iter], depthValue + 1);
      mass.push(obj);
    } else {
      const obj = {};
      obj.name = iter;
      obj.type = 'unchanged';
      obj.value = file[iter];
      obj.depth = depthValue;
      obj.children = [];
      mass.push(obj);
    }
  });
  return mass;
};

const compare = (obj1, obj2, depthValue) => {
  const comparedMass = [];
  const keys = createSharedKeys(obj1, obj2).sort();
  keys.forEach((iter) => {
    if ((obj1[iter] !== undefined) && (obj2[iter] !== undefined)) {
      if ((isObject(obj1[iter])) && (isObject(obj2[iter]))) {
        const obj = {};
        obj.name = iter;
        obj.type = 'unchanged';
        obj.value = [];
        obj.depth = depthValue;
        obj.children = compare(obj1[iter], obj2[iter], depthValue + 1);
        comparedMass.push(obj);
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
            comparedMass.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[iter];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
            comparedMass.push(objForAdded);
          } if (!isObject(obj1[iter]) && isObject(obj2[iter])) {
            const objForDelited = {};
            objForDelited.name = iter;
            objForDelited.type = 'deleted';
            objForDelited.value = obj1[iter];
            objForDelited.depth = depthValue;
            objForDelited.children = [];
            comparedMass.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = [];
            objForAdded.depth = depthValue;
            objForAdded.children = createMassOfOjForVST(obj2[iter], depthValue + 1);
            comparedMass.push(objForAdded);
          } if (isObject(obj1[iter]) && !isObject(obj2[iter])) {
            const objForDelited = {};
            objForDelited.name = iter;
            objForDelited.type = 'deleted';
            objForDelited.value = [];
            objForDelited.depth = depthValue;
            objForDelited.children = createMassOfOjForVST(obj1[iter], depthValue + 1);
            comparedMass.push(objForDelited);
            const objForAdded = {};
            objForAdded.name = iter;
            objForAdded.type = 'updated';
            objForAdded.value = obj2[iter];
            objForAdded.depth = depthValue;
            objForAdded.children = [];
            comparedMass.push(objForAdded);
          }
        } if (obj1[iter] === obj2[iter]) {
          const obj = {};
          obj.name = iter;
          obj.type = 'unchanged';
          obj.value = obj1[iter];
          obj.depth = depthValue;
          obj.children = [];
          comparedMass.push(obj);
        }
      }
    } if (obj1[iter] === undefined) {
      if (isObject(obj2[iter])) {
        const objForAdded = {};
        objForAdded.name = iter;
        objForAdded.type = 'added';
        objForAdded.value = [];
        objForAdded.depth = depthValue;
        objForAdded.children = createMassOfOjForVST(obj2[iter], depthValue + 1);
        comparedMass.push(objForAdded);
      } else {
        const objForAdded = {};
        objForAdded.name = iter;
        objForAdded.type = 'added';
        objForAdded.value = obj2[iter];
        objForAdded.depth = depthValue;
        objForAdded.children = [];
        comparedMass.push(objForAdded);
      }
    } if (obj2[iter] === undefined) {
      if (isObject(obj1[iter])) {
        const objForDelited = {};
        objForDelited.name = iter;
        objForDelited.type = 'removed';
        objForDelited.value = [];
        objForDelited.depth = depthValue;
        objForDelited.children = createMassOfOjForVST(obj1[iter], depthValue + 1);
        comparedMass.push(objForDelited);
      } else {
        const objForDelited = {};
        objForDelited.name = iter;
        objForDelited.type = 'removed';
        objForDelited.value = obj1[iter];
        objForDelited.depth = depthValue;
        objForDelited.children = [];
        comparedMass.push(objForDelited);
      }
    }
  });
  return comparedMass;
};

const genDiff = (filepath1, filepath2, formater) => {
  const obj1 = parcer(filepath1);
  const obj2 = parcer(filepath2);
  const vst = compare(obj1, obj2, 0);
  return vst;
};

export default genDiff;
