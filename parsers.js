import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => fs.readFileSync(getPath(filePath), 'UTF-8');

const convertYmlToObject = (yamlFile) => {
  const file = yaml.load(yamlFile);
  const object = {};
  const items = Object.entries(file);
  items.forEach(([key, value]) => {
    const [first] = value;
    object[key] = first;
  });
  return object;
};

const parcer = (filepath) => {
  const expansion = path.extname(filepath);
  const file = readFile(filepath);
  let object = '';
  if (expansion === '.yml') {
    object = convertYmlToObject(file);
  } if (expansion === '.json') {
    object = JSON.parse(file);
  }
  return object;
};

export default parcer;
