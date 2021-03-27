import yaml from 'js-yaml';

const parsers = {
  yml: (obj) => yaml.load(obj),
  json: (obj) => JSON.parse(obj),
};

const parser = (data, format) => parsers[format](data);

export default parser;
