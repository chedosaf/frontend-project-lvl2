const createProperty = (mass) => {
  let prop = '';
  mass.forEach((item) => {
    prop += `${item}.`;
  });
  return prop;
};

const s = ['a', 'b', 'c'];

console.log(createProperty(s));
