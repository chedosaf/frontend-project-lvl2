import parser from '../src/parsers.js';
import expected from '../__fixtures__/expectedParser.js';

const receivedParser = parser('__fixtures__/fileAfter.json');
const wrongFormatFile = '__fixtures__/expectedPlain';

test('Parser should output object and log Error if wrong format input', () => {
  expect(JSON.stringify(receivedParser)).toBe(JSON.stringify(expected));
  expect(() => { parser(wrongFormatFile); }).toThrow('Wrong Format');
  expect(() => { parser(''); }).toThrow('Wrong Format');
});
