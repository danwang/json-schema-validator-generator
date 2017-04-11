// @flow

const INDENT = '  ';
const indent = (line: string) => `${INDENT}${line}`;
const indentLines = (lines: Array<string>, depth: number) => {
  return lines.map((l) => `${INDENT.repeat(depth)}${l}`);
};

const gengensym = (prefix: string = 'v') => {
  let i = 0;
  return () => `${prefix}${i++}`;
};

type Type = (
  'integer' |
  'number' |
  'string' |
  'object' |
  'array' |
  'boolean' |
  'null'
);
const primitivePredicate = (type: Type, symbol: string): string => {
  switch (type) {
    case 'integer':
      return `typeof ${symbol} === 'number' && ${symbol} % 1 === 0`;
    case 'number':
      return `typeof ${symbol} === 'number'`;
    case 'string':
      return `typeof ${symbol} === 'string'`;
    case 'object':
      return `${symbol} && typeof ${symbol} === 'object' && !Array.isArray(${symbol})`;
    case 'array':
      return `Array.isArray(${symbol})`;
    case 'boolean':
      return `typeof ${symbol} === 'boolean'`;
    case 'null':
      return `${symbol} === null`;
    default:
      return 'false';
  }
};

// Wraps lines of code in a check such that it only executes when the value of
// `symbol` is the type
const typeCheck = (type: Type, symbol: string, lines: Array<string>): Array<string> => {
  return [
    `if (${primitivePredicate(type, symbol)}) {`,
    ...lines.map(indent),
    '}',
  ];
};

export default {
  indent,
  indentLines,
  gengensym,
  primitivePredicate,
  typeCheck,
};
