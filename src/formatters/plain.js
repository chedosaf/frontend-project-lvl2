import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'string') ? `'${item}'` : item);
const getPath = (path, cur) => [...path, cur].join('.');

const stringify = (node, path, fn) => {
  const strValue = (value) => (!_.isObject(value) ? createQuotes(value) : complex);
  if (node.type === 'updated') {
    return `Property '${getPath(path, node.key)}' was updated. From ${strValue(node.prevValue)} to ${strValue(node.value)}`;
  } if (node.type === 'deleted') {
    return `Property '${getPath(path, node.key)}' was removed`;
  } if (node.type === 'added') {
    return `Property '${getPath(path, node.key)}' was added with value: ${!_.isObject(node.value) ? createQuotes(node.value) : complex}`;
  } if (node.type === 'attachment') {
    return `${fn(node.children, [...path, node.key])}`;
  } return [];
};

const formatePlain = (arr, path = []) => arr.flatMap((current) => stringify(current, path, formatePlain)).join('\n');

export default formatePlain;
