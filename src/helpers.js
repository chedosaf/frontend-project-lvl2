import fs from 'fs';
import path from 'path';

const isObject = (item) => (typeof item === 'object' && !Array.isArray(item) && item !== null);

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => fs.readFileSync(getPath(filePath), 'UTF-8');

export { isObject, readFile };
