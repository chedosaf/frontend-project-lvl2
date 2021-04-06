import _ from 'lodash';

const createSpace = (depth, spacesCount = 4) => ' '.repeat(depth * spacesCount - 2);

const toString = (value, depth, toFormat) => {
  if (_.isObject(value)) {
    return toFormat(value, depth + 1);
  }
  return value;
};

const makeStylishString = (node, depth) => {
  const keys = _.sortBy(Object.keys(node));
  const formated = keys.reduce((acc, key) => {
    const value = node[key];
    return `${acc}${createSpace(depth)}  ${key}: ${toString(value, depth, makeStylishString)}\n`;
  }, '');
  return `{\n${formated}${createSpace(depth).substring(2)}}`;
};

const stringify = (depth, node, type, value = node.value) => `${createSpace(depth)}${type} ${node.key}: ${toString(value, depth, makeStylishString)}`;

const stylish = (arr, depth = 1) => {
  const stylished = arr.map((node) => {
    switch (node.type) {
      case 'attachment':
        return stringify(depth, node, ' ', stylish(node.children, depth + 1));
      case 'unchanged':
        return stringify(depth, node, ' ');
      case 'deleted':
        return stringify(depth, node, '-');
      case 'added':
        return stringify(depth, node, '+');
      case 'updated':
        return `${stringify(depth, node, '-', node.prevValue)}\n${stringify(depth, node, '+')}`;
      default:
        throw Error(`${node.type} incorrect type of node for Stylish`);
    }
  }).join('\n');
  return `{\n${stylished}\n${createSpace(depth).substring(2)}}`;
};

export default stylish;
