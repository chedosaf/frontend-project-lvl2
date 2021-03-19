import _ from 'lodash';

const indent = '    ';
const deleted = '- ';
const added = '+ ';

const createSpace = (depth) => indent.repeat(depth);

const makeStylishString = (obj, depth) => {
  const keys = _.sortBy(Object.keys(obj));
  const createStr = keys.reduce((acc, cur) => {
    const value = obj[cur];
    const str = `    ${cur}: ${_.isObject(value) ? makeStylishString(value, depth + 1) : value}\n${createSpace(depth)}`;
    return acc + str;
  }, '');
  return `{\n${createSpace(depth)}${createStr}}`;
};

const stylish = (arr, depth = 0) => arr.reduce((acc, cur) => {
  const makeStr = (type) => `${acc}\n  ${createSpace(depth)}${type}${cur.key}: ${_.isObject(cur.value) ? makeStylishString(cur.value, depth + 1) : cur.value}`;
  switch (cur.type) {
    case 'attachment':
      return `${acc}\n  ${createSpace(depth)}  ${cur.key}: {${stylish(cur.children, depth + 1)}\n    ${createSpace(depth)}}`;
    case 'unchanged':
      return `${acc}\n  ${createSpace(depth)}  ${cur.key}: ${cur.value}`;
    case 'deleted':
      return makeStr(deleted);
    case 'added':
      return makeStr(added);
    case 'updated':
      return `${acc}\n  ${createSpace(depth)}- ${cur.key}: ${_.isObject(cur.prevValue) ? makeStylishString(cur.prevValue, depth + 1) : cur.prevValue}
  ${createSpace(depth)}+ ${cur.key}: ${_.isObject(cur.value) ? makeStylishString(cur.value, depth + 1) : cur.value}`;
    default:
      return acc;
  }
}, '');

const formateStylish = (arr) => `{${stylish(arr)}\n}`;

export default formateStylish;
