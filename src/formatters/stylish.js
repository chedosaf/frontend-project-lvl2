import _ from 'lodash';

const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const stylish = (mas, depth = 0) => mas.reduce((previousValue, currentValue) => {
  const makeObjToStylishString = (obj, curDepth) => {
    const keys = _.sortBy(Object.keys(obj));
    const str = keys.reduce((acc, current) => {
      const a = `    ${current}: ${_.isObject(obj[current]) ? makeObjToStylishString(obj[current], curDepth + 1) : obj[current]}\n${indent.repeat(curDepth)}`;
      return acc + a;
    }, '');
    return `{\n${indent.repeat(curDepth)}${str}}`;
  };
  const makeStr = (type) => `\n  ${indent.repeat(depth)}${type}${currentValue.name}: ${_.isObject(currentValue.value) ? makeObjToStylishString(currentValue.value, depth + 1) : currentValue.value}`;
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
      return `${previousValue}\n  ${indent.repeat(depth)}${deleted}${currentValue.name}: ${_.isObject(currentValue.prevValue) ? makeObjToStylishString(currentValue.prevValue, depth + 1) : currentValue.prevValue}\n  ${indent.repeat(depth)}${added}${currentValue.name}: ${_.isObject(currentValue.newValue) ? makeObjToStylishString(currentValue.newValue, depth + 1) : currentValue.newValue}`;
    default:
      return previousValue;
  }
}, '');

const formateStylish = (mass) => {
  const a = stylish(mass);
  return `{${a}\n}`;
};

export default formateStylish;
