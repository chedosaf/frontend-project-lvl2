const indent = '    ';
const unchanged = '  ';
const deleted = '- ';
const added = '+ ';

const formateStylish = (mass) => {
  const stylish = (mas) => mas.reduce((previousValue, correntValue) => {
    const makeStrWithChildren = (value) => `\n  ${indent.repeat(correntValue.depth)}${value}${correntValue.name}: {${stylish(correntValue.children)}\n    ${indent.repeat(correntValue.depth)}}`;
    const makeStrWithoutChildren = (value) => `\n  ${indent.repeat(correntValue.depth)}${value}${correntValue.name}: ${correntValue.value}`;
    if ((correntValue.type === 'unchanged' || correntValue.type === 'attachment')
    && (correntValue.children.length !== 0)) {
      const str = makeStrWithChildren(unchanged);
      return previousValue + str;
    } if ((correntValue.type === 'unchanged' || correntValue.type === 'attachment')
    && (correntValue.children.length === 0)) {
      const str = makeStrWithoutChildren(unchanged);
      return previousValue + str;
    } if ((correntValue.type === 'deleted' || correntValue.type === 'removed')
      && (correntValue.children.length !== 0)) {
      const str = makeStrWithChildren(deleted);
      return previousValue + str;
    } if ((correntValue.type === 'deleted' || correntValue.type === 'removed')
    && (correntValue.children.length === 0)) {
      const str = makeStrWithoutChildren(deleted);
      return previousValue + str;
    } if ((correntValue.type === 'added' || correntValue.type === 'updated')
      && (correntValue.children.length !== 0)) {
      const str = makeStrWithChildren(added);
      return previousValue + str;
    } if ((correntValue.type === 'added' || correntValue.type === 'updated')
      && (correntValue.children.length === 0)) {
      const str = makeStrWithoutChildren(added);
      return previousValue + str;
    } return previousValue;
  }, '');
  const a = stylish(mass);
  return `{${a}\n}`;
};

export default formateStylish;
