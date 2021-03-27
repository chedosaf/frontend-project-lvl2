import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'string') ? `'${item}'` : item);
const getPath = (path, cur) => [...path, cur].join('.');

const formatePlain = (arr, path = []) => arr.flatMap((current) => {
  switch (current.type) {
    case 'attachment':
      return `${formatePlain(current.children, [...path, current.key])}`;
    case 'updated':
      return `Property '${getPath(path, current.key)}' was updated. From ${!_.isObject(current.prevValue)
        ? createQuotes(current.prevValue) : complex} to ${!_.isObject(current.value) ? createQuotes(current.value) : complex}`;
    case 'deleted':
      return `Property '${getPath(path, current.key)}' was removed`;
    case 'added':
      return `Property '${getPath(path, current.key)}' was added with value: ${!_.isObject(current.value) ? createQuotes(current.value) : complex}`;
    case 'unchanged':
      return [];
    default:
      throw Error('Wrong type of node');
  }
}).join('\n');

export default formatePlain;
