import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../main.js';
import expected from '../__fixtures__/expected.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("gendiff.js should output the difference between the two JSON's", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`)).toEqual(expected);
});

test("gendiff.js should output the difference between the two YML's", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`)).toEqual(expected);
});
