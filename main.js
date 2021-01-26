import fs from 'fs';
import path from 'path';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = Array.from(new Set(sharedKeys));
  return uniqSharedKeys.sort();
};

const getPath = (filepath) => path.resolve(process.cwd(), filepath);

const readFile = (filepath) => fs.readFileSync(getPath(filepath), 'UTF-8');

const compare = (keys, json1, json2) => {
  const array = {};
  for (let i = 0; i < keys.length; i += 1) {
    const iter = keys[i];
    const unchangedKey = `  ${iter}`;
    const deletedKey = `- ${iter}`;
    const addedKey = `+ ${iter}`;
    if (json1[iter] === undefined) {
      array[addedKey] = json2[iter];
    } if (json2[iter] === undefined) {
      array[deletedKey] = json1[iter];
    } if (json1[iter] === json2[iter]) {
      array[unchangedKey] = json1[iter];
    } if ((json1[iter] !== json2[iter])
    && ((json2[iter] !== undefined) && (json2[iter] !== undefined))) {
      array[deletedKey] = json1[iter];
      array[addedKey] = json2[iter];
    }
  }
  return array;
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
