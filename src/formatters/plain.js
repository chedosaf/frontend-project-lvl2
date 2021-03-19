import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'string') ? `'${item}'` : item);
const getPath = (path, cur) => [...path, cur].join('.');

const formatePlain = (arr, path = []) => arr.reduce((acc, current) => {
  switch (current.type) {
    case 'attachment':
      return `${acc}${formatePlain(current.children, [...path, current.key])}\n`;
    case 'updated':
      return `${acc}Property '${getPath(path, current.key)}' was updated. From ${!_.isObject(current.prevValue) ? createQuotes(current.prevValue) : complex} to ${!_.isObject(current.value) ? createQuotes(current.value) : complex}\n`;
    case 'deleted':
      return `${acc}Property '${getPath(path, current.key)}' was removed\n`;
    case 'added':
      return `${acc}Property '${getPath(path, current.key)}' was added with value: ${!_.isObject(current.value) ? createQuotes(current.value) : complex}\n`;
    default:
      return acc;
  }
}, '').trim();

export default formatePlain;
