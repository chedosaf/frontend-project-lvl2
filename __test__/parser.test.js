import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import parser from '../src/parsers.js';
import readFile from '../src/helpers.js';
import expected from '../__fixtures__/expectedParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const file = readFile(`${__dirname}/../__fixtures__/fileAfter.json`);
const expansion = path.extname(`${__dirname}/../__fixtures__/fileAfter.json`);
const receivedParser = parser(file, expansion);
const wrongFormatFile = readFile(`${__dirname}/../__fixtures__/expectedPlain`);
const wrongFormatExpansion = path.extname(`${__dirname}/../__fixtures__/expectedPlain`);

test('Parser should output object and log Error if wrong format input', () => {
  expect(JSON.stringify(receivedParser)).toBe(JSON.stringify(expected));
  expect(() => { parser(wrongFormatFile, wrongFormatExpansion); }).toThrow('Wrong Format');
  expect(() => { parser('', ''); }).toThrow('Wrong Format');
});
