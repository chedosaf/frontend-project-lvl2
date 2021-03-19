import _ from 'lodash';

const indent = '    ';
const deleted = '- ';
const added = '+ ';

const createSpace = (depth) => indent.repeat(depth);

const makeStylishString = (obj, depth) => {
  const keys = _.sortBy(Object.keys(obj));
  const createStr = keys.reduce((acc, current) => {
    const value = obj[current];
    const str = `    ${current}: ${_.isObject(value) ? makeStylishString(value, depth + 1) : value}\n${createSpace(depth)}`;
    return acc + str;
  }, '');
  return `{\n${createSpace(depth)}${createStr}}`;
};

const stylish = (arr, depth = 0) => arr.reduce((acc, currentValue) => {
  const makeStr = (type) => `${acc}\n  ${createSpace(depth)}${type}${currentValue.key}: ${_.isObject(currentValue.value) ? makeStylishString(currentValue.value, depth + 1) : currentValue.value}`;
  switch (currentValue.type) {
    case 'attachment':
      return `${acc}\n  ${createSpace(depth)}  ${currentValue.key}: {${stylish(currentValue.children, depth + 1)}\n    ${createSpace(depth)}}`;
    case 'unchanged':
      return `${acc}\n  ${createSpace(depth)}  ${currentValue.key}: ${currentValue.value}`;
    case 'deleted':
      return makeStr(deleted);
    case 'added':
      return makeStr(added);
    case 'updated':
      return `${acc}\n  ${createSpace(depth)}- ${currentValue.key}: ${_.isObject(currentValue.prevValue) ? makeStylishString(currentValue.prevValue, depth + 1) : currentValue.prevValue}
  ${createSpace(depth)}+ ${currentValue.key}: ${_.isObject(currentValue.value) ? makeStylishString(currentValue.value, depth + 1) : currentValue.value}`;
    default:
      return acc;
  }
}, '');

const formateStylish = (arr) => `{${stylish(arr)}\n}`;

export default formateStylish;
