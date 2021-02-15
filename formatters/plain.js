const formatePlain = (mass) => {
  const property = [];
  let str = '';
  const complex = '[complex value]';
  const createProperty = (namesMass) => {
    let prop = '';
    namesMass.forEach((item) => {
      prop += `${item}.`;
    });
    return prop;
  };
  const createQuotes = (item) => ((typeof item === 'boolean' || item === null) ? item : `'${item}'`);
  const plain = (mas) => {
    for (let i = 0; i < mas.length; i += 1) {
      if (mas[i].type === 'unchanged' && mas[i].children.length !== 0) {
        property.push(mas[i].name);
        plain(mas[i].children);
      } if (mas[i].type === 'removed') {
        str += `Property '${createProperty(property) + mas[i].name}' was removed\n`;
      } if (mas[i].type === 'added') {
        str += `Property '${createProperty(property) + mas[i].name}' was added with value: ${mas[i].children.length === 0 ? createQuotes(mas[i].value) : complex}\n`;
      } if (mas[i].type === 'deleted') {
        str += `Property '${createProperty(property) + mas[i].name}' was updated. From ${mas[i].children.length === 0 ? createQuotes(mas[i].value) : complex} to ${mas[i + 1].children.length === 0 ? createQuotes(mas[i + 1].value) : complex}\n`;
        i += 1;
      }
      if (i === mas.length - 1) {
        property.pop();
      }
    }
  };
  plain(mass);
  return str.trim();
};

export default formatePlain;
