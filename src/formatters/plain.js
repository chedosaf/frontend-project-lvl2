import _ from 'lodash';

const getPath = (path, cur) => [...path, cur].join('.');
const toString = (value) => {
  if (!_.isObject(value)) {
    return (typeof value === 'string') ? `'${value}'` : value;
  } return '[complex value]';
};

const stringify = (node, path, toFormat) => {
  switch (node.type) {
    case 'updated':
      return `Property '${getPath(path, node.key)}' was updated. From ${toString(node.prevValue)} to ${toString(node.value)}`;
    case 'deleted':
      return `Property '${getPath(path, node.key)}' was removed`;
    case 'added':
      return `Property '${getPath(path, node.key)}' was added with value: ${toString(node.value)}`;
    case 'attachment':
      return `${toFormat(node.children, [...path, node.key])}`;
    case 'unchanged':
      return [];
    default:
      throw Error('Wrong node type');
  }
};

const formatePlain = (arr, path = []) => arr.flatMap((current) => stringify(current, path, formatePlain)).join('\n');

export default formatePlain;
