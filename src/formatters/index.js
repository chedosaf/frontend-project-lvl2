import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';

const convertToFormate = (tree, format) => {
  switch (format) {
    case 'stylish':
      return formateStylish(tree);
    case 'plain':
      return formatePlain(tree);
    case 'json':
      return formateJson(tree);
    default:
      return formateStylish(tree);
  }
};

export default convertToFormate;
