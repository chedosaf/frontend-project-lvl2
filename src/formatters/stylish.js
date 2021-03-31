import _ from 'lodash';

const createSpace = (depth, indentCount = 2) => ' '.repeat(indentCount).repeat(depth);

const toString = (value, depth, toFormate) => {
  if (_.isObject(value)) {
    return toFormate(value, depth + 2);
  } return value;
};

const makeStylishString = (node, depth) => {
  const keys = _.sortBy(Object.keys(node));
  const nodeText = keys.reduce((acc, key) => {
    const value = node[key];
    const str = `${acc}${createSpace(depth)}  ${key}: ${toString(value, depth, makeStylishString)}\n`;
    return str;
  }, '');
  return `{\n${nodeText}${createSpace(depth - 1)}}`;
};

const stringify = (depth, node, type, value = node.value) => `${createSpace(depth)}${type} ${node.key}: ${toString(value, depth, makeStylishString)}`;

const stylish = (arr, depth = 1) => {
  const stylished = arr.map((node) => {
    switch (node.type) {
      case 'attachment':
        return stringify(depth, node, ' ', stylish(node.children, depth + 2));
      case 'unchanged':
        return stringify(depth, node, ' ');
      case 'deleted':
        return stringify(depth, node, '-');
      case 'added':
        return stringify(depth, node, '+');
      case 'updated':
        return `${stringify(depth, node, '-', node.prevValue)}\n${stringify(depth, node, '+')}`;
      default:
        throw Error('Unknown type of node');
    }
  }).join('\n');
  return `{\n${stylished}\n${createSpace(depth - 1)}}`;
};

export default stylish;
