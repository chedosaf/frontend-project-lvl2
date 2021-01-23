import fs from 'fs';
import path from 'path';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = sharedKeys.filter((item, index) => sharedKeys.indexOf(item) === index);
  return uniqSharedKeys;
};

const genDiff = (filepath1, filepath2) => {
  const jsonObj1 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath1), 'UTF-8'));
  const jsonObj2 = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), filepath2), 'UTF-8'));
  const array = {};
  const keys = createSharedKeys(jsonObj1, jsonObj2).sort();
  for (let i = 0; i < keys.length; i += 1) {
    if (jsonObj1[keys[i]] && jsonObj2[keys[i]]) {
      if (jsonObj1[keys[i]] === jsonObj2[keys[i]]) {
        array[`  ${keys[i]}`] = jsonObj1[keys[i]];
      } if (jsonObj1[keys[i]] !== jsonObj2[keys[i]]) {
        const key1 = `- ${keys[i]}`;
        const key2 = `+ ${keys[i]}`;
        array[key1] = jsonObj1[keys[i]];
        array[key2] = jsonObj2[keys[i]];
      }
    } if (jsonObj1[keys[i]] !== undefined && jsonObj2[keys[i]] === undefined) {
      array[`- ${keys[i]}`] = jsonObj1[keys[i]];
    } if (jsonObj1[keys[i]] === undefined && jsonObj2[keys[i]] !== undefined) {
      array[`+ ${keys[i]}`] = jsonObj2[keys[i]];
    }
  }
  console.log(JSON.stringify(array, null, 2).replace(/"/g, ''));
};

export default genDiff;
