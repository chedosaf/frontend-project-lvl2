import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'boolean' || item === null || item === 0) ? item : `'${item}'`);

const formatePlain = (mass, path = []) => mass.reduce((acc, current) => {
  const makeString = (item) => {
    switch (item.type) {
      case 'attachment':
        return `${formatePlain(current.children, _.concat(path, item.name, ['.']))}\n`;
      case 'updated':
        return `Property '${path.join('')}${item.name}' was updated. From ${!_.isObject(item.prevValue) ? createQuotes(item.prevValue) : complex} to ${!_.isObject(item.newValue) ? createQuotes(item.newValue) : complex}\n`;
      case 'deleted':
        return `Property '${path.join('')}${item.name}' was removed\n`;
      case 'added':
        return `Property '${path.join('')}${item.name}' was added with value: ${!_.isObject(item.value) ? createQuotes(item.value) : complex}\n`;
      default:
        return '';
    }
  };
  return acc + makeString(current);
}, '').trim();

export default formatePlain;
