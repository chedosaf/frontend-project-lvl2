import _ from 'lodash';

const attachment = ' ';
const unchanged = ' ';
const deleted = '-';
const added = '+';

const createSpace = (depth, indentCount = 2) => ' '.repeat(indentCount).repeat(depth);

const makeStylishString = (node, depth) => {
  const keys = _.sortBy(Object.keys(node));
  const nodeText = keys.reduce((acc, key) => {
    const value = node[key];
    const str = `${acc}${createSpace(depth)}  ${key}: ${_.isObject(value) ? makeStylishString(value, depth + 2) : value}\n`;
    return str;
  }, '');
  return `{\n${nodeText}${createSpace(depth - 1)}}`;
};

const stringify = (depth, node, type, value = node.value) => {
  const strValue = _.isObject(value) ? makeStylishString(value, depth + 2) : value;
  return `${createSpace(depth)}${type} ${node.key}: ${strValue}`;
};

const stylish = (arr, depth = 1) => {
  const stylished = arr.map((node) => {
    switch (node.type) {
      case 'attachment':
        return stringify(depth, node, attachment, stylish(node.children, depth + 2));
      case 'unchanged':
        return stringify(depth, node, unchanged);
      case 'deleted':
        return stringify(depth, node, deleted);
      case 'added':
        return stringify(depth, node, added);
      case 'updated':
        return `${stringify(depth, node, deleted, node.prevValue)}\n${stringify(depth, node, added)}`;
      default:
        throw Error('Unknown type of node');
    }
  }).join('\n');
  return `{\n${stylished}\n${createSpace(depth - 1)}}`;
};

export default stylish;
