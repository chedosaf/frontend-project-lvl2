import fs from 'fs';
import path from 'path';

const getPath = (filePath) => path.resolve(process.cwd(), filePath);

const readFile = (filePath) => {
  try {
    return fs.readFileSync(getPath(filePath), 'UTF-8');
  } catch (e) {
    return () => { throw new Error(); };
  }
};

export default readFile;
