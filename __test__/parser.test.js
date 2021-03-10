import parser from '../src/parsers.js';
import expected from '../__fixtures__/expectedParser.js';

const receivedParser = parser('__fixtures__/fileAfter.json', '.json');
const wrongFormatFile = '__fixtures__/plain';

test('Parser should output object', () => {
  expect(JSON.stringify(receivedParser)).toBe(JSON.stringify(expected));
});
test('Parser should throw Error if wrong format input', () => {
  expect(() => { parser(wrongFormatFile); }).toThrow();
  expect(() => { parser(''); }).toThrow();
});
