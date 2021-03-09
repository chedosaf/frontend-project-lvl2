import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/main.js';
import readFile from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const before = getFixturePath('fileBefore.yml');
const after = getFixturePath('fileAfter.json');
test.each([
  'json', 'plain', 'stylish',
])('gendiff.js should output the difference between the two files in expected format', (a) => {
  const received = genDiff(before, after, a);
  const expected = readFile(getFixturePath(a));
  expect(received).toBe(expected);
});
