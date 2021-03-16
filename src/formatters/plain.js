import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'boolean' || item === null || item === 0) ? item : `'${item}'`);

const formatePlain = (arr, path = []) => arr.reduce((acc, current) => {
  switch (current.type) {
    case 'attachment':
      return `${acc}${formatePlain(current.children, _.concat(path, current.name, ['.']))}\n`;
    case 'updated':
      return `${acc}Property '${path.join('')}${current.name}' was updated. From ${!_.isObject(current.prevValue) ? createQuotes(current.prevValue) : complex} to ${!_.isObject(current.newValue) ? createQuotes(current.newValue) : complex}\n`;
    case 'deleted':
      return `${acc}Property '${path.join('')}${current.name}' was removed\n`;
    case 'added':
      return `${acc}Property '${path.join('')}${current.name}' was added with value: ${!_.isObject(current.value) ? createQuotes(current.value) : complex}\n`;
    default:
      return acc;
  }
}, '').trim();

export default formatePlain;
