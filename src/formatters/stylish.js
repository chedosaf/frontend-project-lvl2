import _ from 'lodash';

const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const makeStylishString = (obj, curDepth) => {
  const keys = _.sortBy(Object.keys(obj));
  const createStr = keys.reduce((acc, current) => {
    const str = `    ${current}: ${_.isObject(obj[current]) ? makeStylishString(obj[current], curDepth + 1) : obj[current]}\n${indent.repeat(curDepth)}`;
    return acc + str;
  }, '');
  return `{\n${indent.repeat(curDepth)}${createStr}}`;
};

const stylish = (arr, depth = 0) => arr.reduce((previousValue, currentValue) => {
  const makeStr = (type) => `\n  ${indent.repeat(depth)}${type}${currentValue.key}: ${_.isObject(currentValue.value) ? makeStylishString(currentValue.value, depth + 1) : currentValue.value}`;
  switch (currentValue.type) {
    case 'attachment':
      return `${previousValue}\n  ${indent.repeat(depth)}${unchanged}${currentValue.key}: {${stylish(currentValue.children, depth + 1)}\n    ${indent.repeat(depth)}}`;
    case 'unchanged':
      return `${previousValue}\n  ${indent.repeat(depth)}${unchanged}${currentValue.key}: ${currentValue.value}`;
    case 'deleted':
      return previousValue + makeStr(deleted);
    case 'added':
      return previousValue + makeStr(added);
    case 'updated':
      return `${previousValue}\n  ${indent.repeat(depth)}${deleted}${currentValue.key}: ${_.isObject(currentValue.prevValue) ? makeStylishString(currentValue.prevValue, depth + 1) : currentValue.prevValue}\n  ${indent.repeat(depth)}${added}${currentValue.key}: ${_.isObject(currentValue.value) ? makeStylishString(currentValue.value, depth + 1) : currentValue.value}`;
    default:
      return previousValue;
  }
}, '');

const formateStylish = (arr) => `{${stylish(arr)}\n}`;

export default formateStylish;
