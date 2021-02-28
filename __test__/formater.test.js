import { fileURLToPath } from 'url';
import { dirname } from 'path';
import readFile from '../src/helpers.js';
import convertToFormate from '../src/formatters/index.js';
import vst from '../__fixtures__/vst.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const expectedJson = readFile(`${__dirname}/../__fixtures__/expectedJSON.json`);
const expectedPlain = readFile(`${__dirname}/../__fixtures__/expectedPlain`);
const expectedStylish = readFile(`${__dirname}/../__fixtures__/expectedStylish`);

test.each([
  ['stylish', expectedStylish],
  ['plain', expectedPlain],
  ['json', expectedJson],
])('convertToFormate should convert vst to right format', (a, expected) => {
  expect(convertToFormate(vst, a)).toBe(expected.trim());
});

test('convertToFormate without format input should convert vst to Stylishformat', () => {
  expect(convertToFormate(vst)).toBe(expectedStylish.trim());
});

test("convertToFormate should throw error if input tree doesn't have right format", () => {
  expect(() => { convertToFormate(''); }).toThrow('Wrong tree');
});
