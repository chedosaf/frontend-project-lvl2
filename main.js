import fs from 'fs';
import path from 'path';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = sharedKeys.filter((item, index) => sharedKeys.indexOf(item) === index);
  return uniqSharedKeys;
};

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'UTF-8');

const compare = (keys, json1, json2) => {
  const array = {};
  for (let i = 0; i < keys.length; i += 1) {
    const iterialKey = keys[i];
    const deletedKey = `- ${iterialKey}`;
    const addedKey = `+ ${iterialKey}`;
    const iterialJson1Value = json1[iterialKey];
    const iterialJson2Value = json2[iterialKey];
    if (iterialJson1Value && iterialJson2Value) {
      if (iterialJson1Value === iterialJson2Value) {
        array[`  ${iterialKey}`] = iterialJson1Value;
      } if (iterialJson1Value !== iterialJson2Value) {
        array[deletedKey] = iterialJson1Value;
        array[addedKey] = iterialJson2Value;
      }
    } if (iterialJson1Value !== undefined && iterialJson2Value === undefined) {
      array[deletedKey] = json1[iterialKey];
    } if (iterialJson1Value === undefined && iterialJson2Value !== undefined) {
      array[addedKey] = json2[iterialKey];
    }
  } return array;
};

const genDiff = (filepath1, filepath2) => {
  const json1 = readFile(filepath1);
  const json2 = readFile(filepath2);
  const jsonObj1 = JSON.parse(json1);
  const jsonObj2 = JSON.parse(json2);
  const keys = createSharedKeys(jsonObj1, jsonObj2).sort();
  const array = compare(keys, jsonObj1, jsonObj2);
  console.log(JSON.stringify(array, null, 2).replace(/"/g, '').replace(/,/g, ''));
  return JSON.stringify(array, null, 2).replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;
