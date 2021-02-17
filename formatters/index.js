import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';

const convertToFormate = (tree, format) => {
  let result = '';
  if (format === 'stylish') {
    result = formateStylish(tree);
  } if (format === 'plain') {
    result = formatePlain(tree);
  } if (format === 'json') {
    result = formateJson(tree);
  }
  return result;
};

export default convertToFormate;
