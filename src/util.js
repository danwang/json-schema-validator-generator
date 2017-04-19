// @flow
import _ from 'lodash';
import Ast from 'js/jsast/ast.js';
import type {JsAst, VarType} from 'js/jsast/ast.js';

const INDENT = '  ';
const indent = (line: string, depth: number) => `${_.repeat(INDENT, depth)}${line}`;

const gengensym = () => {
  const cache = {};
  return (prefix: string = 'v') => {
    cache[prefix] = cache[prefix] || 0;
    return `${prefix}${cache[prefix]++}`;
  };
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
const primitivePredicate = (type: BaseType, symbol: VarType): JsAst => {
  switch (type) {
    case 'integer':
      return Ast.Binop.And(
        Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.Literal('\'number\'')),
        Ast.Binop.Eq(Ast.Binop.Mod(symbol, Ast.Literal(1)), Ast.Literal(0)),
      );
    case 'number':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.Literal('\'number\''));
    case 'string':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.Literal('\'string\''));
    case 'object':
      return Ast.Binop.And(
        symbol,
        Ast.Binop.And(
          Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.Literal('\'object\'')),
          Ast.Unop.Not(Ast.Call('Array.isArray', symbol)),
        ),
      );
    case 'array':
      return Ast.Call('Array.isArray', symbol);
    case 'boolean':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.Literal('\'boolean\''));
    case 'null':
      return Ast.Binop.Eq(symbol, Ast.Null);
    default:
      return Ast.False;
  }
};

// Wraps lines of code in a check such that it only executes when the value of
// `symbol` is the type
const typeCheck = (type: BaseType, symbol: VarType, body: JsAst): JsAst => {
  return Ast.If(primitivePredicate(type, symbol), body);
};

export default {
  indent,
  gengensym,
  primitivePredicate,
  typeCheck,
};
