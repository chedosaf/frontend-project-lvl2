import _ from 'lodash';

const complex = '[complex value]';
const createQuotes = (item) => ((typeof item === 'boolean' || item === null || item === 0) ? item : `'${item}'`);

const formatePlain = (mass) => {
  const plain = (mas) => mas.reduce((acc, corrent) => {
    const makeString = (item) => {
      switch (item.type) {
        case 'attachment': {
          return plain(corrent.children);
        }
        case 'updated': {
          return `Property '${item.path.join('')}${item.name}' was updated. From ${!_.isObject(item.prevValue) ? createQuotes(item.prevValue) : complex} to ${!_.isObject(item.value) ? createQuotes(item.value) : complex}\n`;
        }
        case 'removed': {
          return `Property '${item.path.join('')}${item.name}' was removed\n`;
        }
        case 'added': {
          return `Property '${item.path.join('')}${item.name}' was added with value: ${item.children.length === 0 ? createQuotes(item.value) : complex}\n`;
        }
        default: {
          return '';
        }
      }
    };
    return acc + makeString(corrent);
  }, '');
  return plain(mass).trim();
};

export default formatePlain;
