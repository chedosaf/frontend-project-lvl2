import fs from 'fs';
import path from 'path';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => fs.readFileSync(getPath(filePath), 'UTF-8').trim();

const getFormatName = (filepath) => path.extname(filepath).slice(1);

export { readFile, getFormatName };
