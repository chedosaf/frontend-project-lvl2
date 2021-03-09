import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';

const formate = (tree, format) => {
  try {
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
  } catch (e) {
    throw new Error('Wrong tree');
  }
};

export default formate;
