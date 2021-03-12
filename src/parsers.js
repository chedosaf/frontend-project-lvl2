import yaml from 'js-yaml';

const parsers = {
  yml: (obj) => yaml.load(obj),
  json: (obj) => JSON.parse(obj),
};

const parser = (filepath, format) => parsers[format](filepath);

export default parser;
