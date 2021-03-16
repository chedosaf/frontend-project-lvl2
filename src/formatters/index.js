import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';

const formaters = {
  stylish: (tree) => formateStylish(tree),
  plain: (tree) => formatePlain(tree),
  json: (tree) => formateJson(tree),
};

const formate = (tree, format = 'stylish') => formaters[format](tree);

export default formate;
