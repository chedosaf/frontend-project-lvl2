import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'boolean' || item === null || item === 0) ? item : `'${item}'`);

const formatePlain = (mass) => mass.reduce((acc, corrent) => {
  const makeString = (item) => {
    switch (item.type) {
      case 'attachment':
        return `${formatePlain(corrent.children)}\n`;
      case 'updated':
        return `Property '${item.path.join('')}${item.name}' was updated. From ${!_.isObject(item.prevValue) ? createQuotes(item.prevValue) : complex} to ${!_.isObject(item.newValue) ? createQuotes(item.newValue) : complex}\n`;
      case 'deleted':
        return `Property '${item.path.join('')}${item.name}' was removed\n`;
      case 'added':
        return `Property '${item.path.join('')}${item.name}' was added with value: ${!_.isObject(item.value) ? createQuotes(item.value) : complex}\n`;
      default:
        return '';
    }
  };
  return acc + makeString(corrent);
}, '').trim();

export default formatePlain;
