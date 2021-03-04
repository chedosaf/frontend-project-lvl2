import _ from 'lodash';

const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const makeObjToStylishString = (obj, depth) => {
  const keys = _.sortBy(Object.keys(obj));
  const str = keys.reduce((acc, corrent) => {
    const a = `    ${corrent}: ${_.isObject(obj[corrent]) ? makeObjToStylishString(obj[corrent], depth + 1) : obj[corrent]}\n${indent.repeat(depth)}`;
    return acc + a;
  }, '');
  return `{\n${indent.repeat(depth)}${str}}`;
};

const stylish = (mas) => mas.reduce((previousValue, correntValue) => {
  const makeStr = (type) => `\n  ${indent.repeat(correntValue.depth)}${type}${correntValue.name}: ${_.isObject(correntValue.value) ? makeObjToStylishString(correntValue.value, correntValue.depth + 1) : correntValue.value}`;
  switch (true) {
    case (correntValue.type === 'attachment'):
      return `${previousValue}\n  ${indent.repeat(correntValue.depth)}${unchanged}${correntValue.name}: {${stylish(correntValue.children)}\n    ${indent.repeat(correntValue.depth)}}`;
    case (correntValue.type === 'unchanged'):
      return `${previousValue}\n  ${indent.repeat(correntValue.depth)}${unchanged}${correntValue.name}: ${correntValue.value}`;
    case (correntValue.type === 'deleted'):
      return previousValue + makeStr(deleted);
    case (correntValue.type === 'added'):
      return previousValue + makeStr(added);
    case (correntValue.type === 'updated'):
      return `${previousValue}\n  ${indent.repeat(correntValue.depth)}${deleted}${correntValue.name}: ${_.isObject(correntValue.prevValue) ? makeObjToStylishString(correntValue.prevValue, correntValue.depth + 1) : correntValue.prevValue}\n  ${indent.repeat(correntValue.depth)}${added}${correntValue.name}: ${_.isObject(correntValue.newValue) ? makeObjToStylishString(correntValue.newValue, correntValue.depth + 1) : correntValue.newValue}`;
    default:
      return previousValue;
  }
}, '');

const formateStylish = (mass) => {
  const a = stylish(mass);
  return `{${a}\n}`;
};

export default formateStylish;
