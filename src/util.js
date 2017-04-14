// @flow
import _ from 'lodash';

const INDENT = '  ';
const indent = (line: string) => `${INDENT}${line}`;
const indentN = (line: string, count: number) => `${_.repeat(INDENT, count)}${line}`;
const indentLines = (lines: Array<string>, depth: number) => {
  return lines.map((l) => `${INDENT.repeat(depth)}${l}`);
};

const gengensym = (prefix: string = 'v') => {
  let i = 0;
  return () => `${prefix}${i++}`;
};

export type BaseType = (
  'integer' |
  'number' |
  'string' |
  'object' |
  'array' |
  'boolean' |
  'null'
);
const primitivePredicate = (type: BaseType, symbol: string): string => {
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

const ifs = (predicate: string, body: string | Array<string>): Array<string> => {
  const bodyLines = (typeof body === 'string') ? [body] : body;
  return [
    `if (${predicate}) {`,
    ...bodyLines.map(indent),
    '}',
  ];
};

// Wraps lines of code in a check such that it only executes when the value of
// `symbol` is the type
const typeCheck = (type: BaseType, symbol: string, lines: Array<string>): Array<string> => {
  if (lines.length === 0) {
    return [];
  } else {
    return ifs(primitivePredicate(type, symbol), lines);
  }
};

export default {
  indent,
  indentN,
  indentLines,
  gengensym,
  primitivePredicate,
  ifs,
  typeCheck,
};
