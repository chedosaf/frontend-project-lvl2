import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../bin/main.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';
import { readFile } from '../bin/helpers.js';
import convertToFormate from '../formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("gendiff.js should output the difference between the two JSON's in stylish format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`), 'stylish')).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in stylish format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`), 'stylish')).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in plain format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`), 'plain')).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two JSON's in plain format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`), 'plain')).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two YML's in JSON format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`), 'json')).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});

test("gendiff.js should output the difference between the two JSON's in JSON format", () => {
  expect(convertToFormate(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`), 'json')).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});
