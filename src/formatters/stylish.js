import _ from 'lodash';

const indent = '  ';
const deleted = '- ';
const added = '+ ';

const createSpace = (depth) => indent.repeat(depth);

const makeStylishString = (obj, depth) => {
  const keys = _.sortBy(Object.keys(obj));
  const createStr = keys.reduce((acc, cur) => {
    const value = obj[cur];
    const str = `${createSpace(depth)}  ${cur}: ${_.isObject(value) ? makeStylishString(value, depth + 2) : value}\n`;
    return acc + str;
  }, '');
  return `{\n${createStr}${createSpace(depth - 1)}}`;
};

const stringify = (depth, obj, type = indent, value) => {
  const strValue = _.isObject(value) ? makeStylishString(value, depth + 2) : value;
  return `${createSpace(depth)}${type}${obj.key}: ${strValue}`;
};

const stylish = (arr, depth = 1) => {
  const arrey = arr.map((cur) => {
    switch (cur.type) {
      case 'attachment':
        return stringify(depth, cur, indent, stylish(cur.children, depth + 2));
      case 'unchanged':
        return stringify(depth, cur, indent, cur.value);
      case 'deleted':
        return stringify(depth, cur, deleted, cur.value);
      case 'added':
        return stringify(depth, cur, added, cur.value);
      case 'updated':
        return `${stringify(depth, cur, deleted, cur.prevValue)}\n${stringify(depth, cur, added, cur.value)}`;
      default:
        throw Error('Unknown type of node');
    }
  }).join('\n');
  return `{\n${arrey}\n${createSpace(depth - 1)}}`;
};

export default stylish;
