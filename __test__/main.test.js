import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import genDiff from '../src/main.js';
import readFile from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const receivedStylish = genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.json'), 'stylish');
const receivedPlain = genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.json'), 'plain');
const receivedJson = genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.json'), 'json');
const expectedJson = readFile(getFixturePath('expectedJSON.json'));
const expectedPlain = readFile(getFixturePath('expectedPlain'));
const expectedStylish = readFile(getFixturePath('expectedStylish'));

test.each([
  [receivedStylish, expectedStylish],
  [receivedPlain, expectedPlain],
  [receivedJson, expectedJson],
])('gendiff.js should output the difference between the two files in expected format', (a, expected) => {
  expect(a).toBe(expected.trim());
});
