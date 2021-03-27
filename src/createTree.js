import _ from 'lodash';

const compare = (obj1, obj2) => {
  const uniqSharedKeys = _.union(Object.keys(obj1), Object.keys(obj2));
  const sortedKeys = _.sortBy(uniqSharedKeys);
  const makeNode = (key) => {
    const [prevValue, value] = [obj1[key], obj2[key]];
    switch (true) {
      case (!_.has(obj1, key)):
        return { key, type: 'added', value };
      case (!_.has(obj2, key)):
        return { key, type: 'deleted', value: prevValue };
      case (prevValue === value):
        return { key, type: 'unchanged', value };
      case ((_.isObject(prevValue)) && (_.isObject(value))):
        return { key, type: 'attachment', children: compare(prevValue, value) };
      case ((!_.isObject(prevValue)) || (!_.isObject(value))):
        return {
          key,
          type: 'updated',
          prevValue,
          value,
        };
      default:
        throw Error('!');
    }
  };
  return sortedKeys.map(makeNode);
};

export default compare;
