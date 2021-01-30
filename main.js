import parcer from './parsers.js';

const createSharedKeys = (obj1, obj2) => {
  const keysOfFirstObj = Object.keys(obj1);
  const keysOfSecondObj = Object.keys(obj2);
  const sharedKeys = keysOfFirstObj.concat(keysOfSecondObj);
  const uniqSharedKeys = Array.from(new Set(sharedKeys));
  return uniqSharedKeys.sort();
};

const compare = (keys, json1, json2) => {
  const array = {};
  keys.forEach((iter) => {
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
  });
  return array;
};

const genDiff = (filepath1, filepath2) => {
  const obj1 = parcer(filepath1);
  const obj2 = parcer(filepath2);
  const keys = createSharedKeys(obj1, obj2).sort();
  const array = compare(keys, obj1, obj2);
  console.log(JSON.stringify(array, null, 2).replace(/"/g, '').replace(/,/g, ''));
  return JSON.stringify(array, null, 2).replace(/"/g, '').replace(/,/g, '');
};

export default genDiff;
