import _ from 'lodash';

const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const stylish = (arr, depth = 0) => arr.reduce((previousValue, currentValue) => {
  const makeStylishString = (obj, curDepth) => {
    const keys = _.sortBy(Object.keys(obj));
    const create = keys.reduce((acc, current) => {
      const str = `    ${current}: ${_.isObject(obj[current]) ? makeStylishString(obj[current], curDepth + 1) : obj[current]}\n${indent.repeat(curDepth)}`;
      return acc + str;
    }, '');
    return `{\n${indent.repeat(curDepth)}${create}}`;
  };
  const makeStr = (type) => `\n  ${indent.repeat(depth)}${type}${currentValue.name}: ${_.isObject(currentValue.value) ? makeStylishString(currentValue.value, depth + 1) : currentValue.value}`;
  switch (true) {
    case (currentValue.type === 'attachment'):
      return `${previousValue}\n  ${indent.repeat(depth)}${unchanged}${currentValue.name}: {${stylish(currentValue.children, depth + 1)}\n    ${indent.repeat(depth)}}`;
    case (currentValue.type === 'unchanged'):
      return `${previousValue}\n  ${indent.repeat(depth)}${unchanged}${currentValue.name}: ${currentValue.value}`;
    case (currentValue.type === 'deleted'):
      return previousValue + makeStr(deleted);
    case (currentValue.type === 'added'):
      return previousValue + makeStr(added);
    case (currentValue.type === 'updated'):
      return `${previousValue}\n  ${indent.repeat(depth)}${deleted}${currentValue.name}: ${_.isObject(currentValue.prevValue) ? makeStylishString(currentValue.prevValue, depth + 1) : currentValue.prevValue}\n  ${indent.repeat(depth)}${added}${currentValue.name}: ${_.isObject(currentValue.newValue) ? makeStylishString(currentValue.newValue, depth + 1) : currentValue.newValue}`;
    default:
      return previousValue;
  }
}, '');

const formateStylish = (mass) => `{${stylish(mass)}\n}`;

export default formateStylish;
