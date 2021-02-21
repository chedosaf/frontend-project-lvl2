const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const formateStylish = (mass) => {
  const stylish = (mas) => mas.reduce((previousValue, correntValue) => {
    if (correntValue.type === 'unchanged') {
      if (correntValue.children.length !== 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${unchanged}${correntValue.name}: {${stylish(correntValue.children)}\n    ${indent.repeat(correntValue.depth)}}`;
        return previousValue + str;
      } if (correntValue.children.length === 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${unchanged}${correntValue.name}: ${correntValue.value}`;
        return previousValue + str;
      }
    } if (correntValue.type === 'deleted' || correntValue.type === 'removed') {
      if (correntValue.children.length !== 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${deleted}${correntValue.name}: {${stylish(correntValue.children)}\n    ${indent.repeat(correntValue.depth)}}`;
        return previousValue + str;
      } if (correntValue.children.length === 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${deleted}${correntValue.name}: ${correntValue.value}`;
        return previousValue + str;
      }
    } if (correntValue.type === 'added' || correntValue.type === 'updated') {
      if (correntValue.children.length !== 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${added}${correntValue.name}: {${stylish(correntValue.children)}\n    ${indent.repeat(correntValue.depth)}}`;
        return previousValue + str;
      } if (correntValue.children.length === 0) {
        const str = `\n  ${indent.repeat(correntValue.depth)}${added}${correntValue.name}: ${correntValue.value}`;
        return previousValue + str;
      }
    } return previousValue;
  }, '');
  const a = stylish(mass);
  return `{${a}\n}`;
};

export default formateStylish;
