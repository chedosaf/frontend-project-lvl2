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

const stylish = (arr, depth = 1) => {
  const stringify = (obj, type = indent) => {
    if (!_.has(obj, 'value')) {
      return `${createSpace(depth)}${type}${obj.key}: ${stylish(obj.children, depth + 2)}`;
    } if (_.has(obj, 'prevValue')) {
      return `${createSpace(depth)}- ${obj.key}: ${_.isObject(obj.prevValue)
        ? makeStylishString(obj.prevValue, depth + 2)
        : obj.prevValue}\n${createSpace(depth)}+ ${obj.key}: ${_.isObject(obj.value)
        ? makeStylishString(obj.value, depth + 2)
        : obj.value}`;
    } return `${createSpace(depth)}${type}${obj.key}: ${_.isObject(obj.value) ? makeStylishString(obj.value, depth + 2) : obj.value}`;
  };
  const arrey = arr.flatMap((cur) => {
    switch (cur.type) {
      case 'attachment':
        return stringify(cur);
      case 'unchanged':
        return stringify(cur);
      case 'deleted':
        return stringify(cur, deleted);
      case 'added':
        return stringify(cur, added);
      case 'updated':
        return stringify(cur);
      default:
        throw Error('Wrong type of node');
    }
  }).join('\n');
  return `{\n${arrey}\n${createSpace(depth - 1)}}`;
};

export default stylish;
