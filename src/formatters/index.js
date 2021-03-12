import formateStylish from './stylish.js';
import formatePlain from './plain.js';
import formateJson from './json.js';

const formaters = { // сделал без guard expression, т.к. делаю проверку в тесте на ошибку
  stylish: (tree) => formateStylish(tree),
  plain: (tree) => formatePlain(tree),
  json: (tree) => formateJson(tree),
};

const formate = (tree, format = 'stylish') => formaters[format](tree);

export default formate;
