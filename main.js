import fs from 'fs';
import path from 'path';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = sharedKeys.filter((item, index) => sharedKeys.indexOf(item) === index);
  return uniqSharedKeys;
};

const makePath = (filepath) => path.resolve(process.cwd(), filepath);

const readJson = (filepath) => fs.readFileSync(makePath(filepath), 'UTF-8');

const compare = (keys, json1, json2) => {
  const array = {};
  for (let i = 0; i < keys.length; i += 1) {
    const iterialKey = keys[i];
    const key1 = `- ${iterialKey}`;
    const key2 = `+ ${iterialKey}`;
    if (json1[iterialKey] && json2[iterialKey]) {
      if (json1[iterialKey] === json2[iterialKey]) {
        array[`  ${iterialKey}`] = json1[iterialKey];
      } if (json1[iterialKey] !== json2[iterialKey]) {
        array[key1] = json1[iterialKey];
        array[key2] = json2[iterialKey];
      }
    } if (json1[iterialKey] !== undefined && json2[iterialKey] === undefined) {
      array[`- ${iterialKey}`] = json1[iterialKey];
    } if (json1[iterialKey] === undefined && json2[iterialKey] !== undefined) {
      array[`+ ${iterialKey}`] = json2[iterialKey];
    }
  } return array;
};

const genDiff = (filepath1, filepath2) => {
  const json1 = readJson(filepath1);
  const json2 = readJson(filepath2);
  const jsonObj1 = JSON.parse(json1);
  const jsonObj2 = JSON.parse(json2);
  const keys = createSharedKeys(jsonObj1, jsonObj2).sort();
  const array = compare(keys, jsonObj1, jsonObj2);
  console.log(JSON.stringify(array, null, 2).replace(/"/g, ''));
};

export default genDiff;
