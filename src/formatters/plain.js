import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'string') ? `'${item}'` : item);
const getPath = (path, cur) => [...path, cur].join('.');

const stringify = (node, path, fn) => {
  const strValue = (value) => (!_.isObject(value) ? createQuotes(value) : complex);
  switch (true) {
    case (node.type === 'updated'):
      return `Property '${getPath(path, node.key)}' was updated. From ${strValue(node.prevValue)} to ${strValue(node.value)}`;
    case (node.type === 'deleted'):
      return `Property '${getPath(path, node.key)}' was removed`;
    case (node.type === 'added'):
      return `Property '${getPath(path, node.key)}' was added with value: ${!_.isObject(node.value) ? createQuotes(node.value) : complex}`;
    case (node.type === 'attachment'):
      return `${fn(node.children, [...path, node.key])}`;
    case (node.type === 'unchanged'):
      return [];
    default:
      throw Error('Wrong node type');
  }
};

const formatePlain = (arr, path = []) => arr.flatMap((current) => stringify(current, path, formatePlain)).join('\n');

export default formatePlain;
