import fs from 'fs';
import path from 'path';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => fs.readFileSync(getPath(filePath), 'UTF-8').trim();

export default readFile;
