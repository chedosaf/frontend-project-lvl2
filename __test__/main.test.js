import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../bin/main.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import formateStylish from '../formatters/stylish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("gendiff.js should output the difference between the two JSON's", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, formateStylish)).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, formateStylish)).toBe(expectedStylish.trim());
});
