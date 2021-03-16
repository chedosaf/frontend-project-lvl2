import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import { readFile } from '../src/helpers.js';
import convertToFormate from '../src/formatters/index.js';
import vst from '../__fixtures__/vst.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  'stylish', 'plain', 'json',
])('convertToFormate should convert vst to right format', (format) => {
  const expected = readFile(getFixturePath(format));
  expect(convertToFormate(vst, format)).toBe(expected);
});

test('convertToFormate without format input should convert vst to Stylishformat', () => {
  const expected = readFile(getFixturePath('stylish'));
  expect(convertToFormate(vst)).toBe(expected);
});

test("convertToFormate should throw error if input tree doesn't have right format", () => {
  expect(() => { convertToFormate(''); }).toThrow();
});
