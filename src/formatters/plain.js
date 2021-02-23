import _ from 'lodash';

const formatePlain = (mass) => {
  const complex = '[complex value]';
  const createQuotes = (item) => ((typeof item === 'boolean' || item === null || item === 0) ? item : `'${item}'`);
  const plain = (mas) => mas.reduce((acc, corrent) => {
    const makeString = (item) => {
      if (item.type === 'attachment' && item.children.length !== 0) {
        return plain(corrent.children);
      } if (corrent.type === 'updated') {
        const str = `Property '${item.path.join('')}${item.name}' was updated. From ${!_.isObject(item.prevValue) ? createQuotes(item.prevValue) : complex} to ${!_.isObject(item.value) ? createQuotes(item.value) : complex}\n`;
        return str;
      } if (item.type === 'removed') {
        const str = `Property '${item.path.join('')}${item.name}' was removed\n`;
        return str;
      } if (item.type === 'added') {
        const str = `Property '${item.path.join('')}${item.name}' was added with value: ${item.children.length === 0 ? createQuotes(item.value) : complex}\n`;
        return str;
      } return '';
    };
    return acc + makeString(corrent);
  }, '');
  return plain(mass).trim();
};

export default formatePlain;
