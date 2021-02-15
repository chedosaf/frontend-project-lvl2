import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../bin/main.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import formateStylish from '../formatters/stylish.js';
import formatePlain from '../formatters/plain.js';
import formateJson from '../formatters/json.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';
import { readFile } from '../bin/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test("gendiff.js should output the difference between the two JSON's in stylish format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, formateStylish)).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in stylish format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, formateStylish)).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in plain format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, formatePlain)).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two JSON's in plain format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, formatePlain)).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two YML's in JSON format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.yml`, `${__dirname}/../__fixtures__/after.yml`, formateJson)).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});

test("gendiff.js should output the difference between the two JSON's in JSON format", () => {
  expect(genDiff(`${__dirname}/../__fixtures__/before.json`, `${__dirname}/../__fixtures__/after.json`, formateJson)).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});
