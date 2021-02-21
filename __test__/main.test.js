import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import _ from 'lodash';
import genDiff from '../src/main.js';
import expectedStylish from '../__fixtures__/expectedStylish.js';
import expectedPlain from '../__fixtures__/expectedPlain.js';
import { readFile } from '../src/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Function isObject should output true value if arg is object', () => {
  expect(_.isObject({})).toBe(true);
});

test('Function isObject should output false value if arg is null', () => {
  expect(_.isObject(null)).toBe(false);
});

test('Function isObject should output false value if arg is array', () => {
  expect(_.isObject([])).toBe(true);
});

test('Function isObject should output false value if arg is underfined', () => {
  expect(_.isObject()).toBe(false);
});

test("gendiff.js should output the difference between the two JSON's in stylish format", () => {
  expect(genDiff(getFixturePath('fileBefore.json'), getFixturePath('fileAfter.json'), 'stylish')).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in stylish format", () => {
  expect(genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.yml'), 'stylish')).toBe(expectedStylish.trim());
});

test("gendiff.js should output the difference between the two YML's in plain format", () => {
  expect(genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.yml'), 'plain')).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two JSON's in plain format", () => {
  expect(genDiff(getFixturePath('fileBefore.json'), getFixturePath('fileAfter.json'), 'plain')).toBe(expectedPlain.trim());
});

test("gendiff.js should output the difference between the two YML's in JSON format", () => {
  expect(genDiff(getFixturePath('fileBefore.yml'), getFixturePath('fileAfter.yml'), 'json')).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});

test("gendiff.js should output the difference between the two JSON's in JSON format", () => {
  expect(genDiff(getFixturePath('fileBefore.json'), getFixturePath('fileAfter.json'), 'json')).toBe(readFile(`${__dirname}/../__fixtures__/expectedJSON.json`).trim());
});
