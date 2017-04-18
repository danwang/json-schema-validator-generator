// @flow
/* eslint-disable no-use-before-define */

// Statements
export type JsAst = (
  AssignmentType |
  IfType |
  ReturnType |
  BodyType |
  ForType |
  ForInType |
  EmptyType |
  Function1Type |
  BinopType |
  EmptyType |
  LiteralType |
  CallType |
  NotType |
  ObjectLiteralType
);
type AssignmentType = {
  type: 'assignment',
  variable: LiteralType,
  value: JsAst,
};
export type IfType = {
  type: 'if',
  predicate: JsAst,
  body: JsAst,
  elseBody: JsAst,
};
type ReturnType = {
  type: 'return',
  value: JsAst,
};
export type BodyType = {
  type: 'body',
  body: Array<JsAst>
};
export type ForType = {
  type: 'for',
  init: JsAst,
  condition: JsAst,
  loop: JsAst,
  body: JsAst,
};
export type ForInType = {
  type: 'forin',
  variable: LiteralType,
  iterator: JsAst,
  body: JsAst,
};
type EmptyType = {type: 'empty'};

export type Function1Type = {
  type: 'function1',
  name: LiteralType,
  argument: LiteralType,
  body: JsAst,
};
type BinopType = {
  type: 'binop',
  left: JsAst,
  comparator: string,
  right: JsAst,
};
export type LiteralType = {
  type: 'literal',
  value: string,
};
type CallType = {
  type: 'call',
  fn: LiteralType,
  arg: LiteralType,
};
type NotType = {
  type: 'not',
  child: JsAst,
};
export type ObjectLiteralType = {
  type: 'objectliteral',
  object: {[key: string]: JsAst},
};

const Function1 = (
  name: LiteralType | string,
  argument: LiteralType | string,
  body: JsAst,
): Function1Type => ({
  type: 'function1',
  name: Literal(name),
  argument: Literal(argument),
  body,
});
const _Binop = (comparator: string) => (left: JsAst | string, right: JsAst | string): BinopType => {
  return {
    type: 'binop',
    comparator,
    left: (typeof left === 'string') ? Literal(left) : left,
    right: (typeof right === 'string') ? Literal(right) : right,
  };
};
const Assignment = (variable: LiteralType | string, value: JsAst): AssignmentType => {
  return {
    type: 'assignment',
    variable: Literal(variable),
    value,
  };
};
const If = (predicate: JsAst | string, body: JsAst | string, elseBody: JsAst | string = Empty): IfType => {
  return {
    type: 'if',
    predicate: (typeof predicate === 'string') ? Literal(predicate) : predicate,
    body: (typeof body === 'string') ? Literal(body) : body,
    elseBody: (typeof elseBody === 'string') ? Literal(elseBody) : elseBody,
  };
};
const Return = (value: JsAst | string): ReturnType => {
  return {
    type: 'return',
    value: (typeof value === 'string') ? Literal(value) : value,
  };
};
const Body = (...body: Array<JsAst>): BodyType => ({type: 'body', body});
const For = (
  init: JsAst,
  condition: JsAst,
  loop: JsAst,
  body: JsAst,
): ForType => ({type: 'for', init, condition, loop, body});
const ForIn = (
  variable: LiteralType | string,
  iterator: JsAst,
  body: JsAst,
): ForInType => ({
  type: 'forin',
  variable: Literal(variable),
  iterator,
  body,
});
const Empty = {type: 'empty'};
const Literal = (value: LiteralType | string): LiteralType => {
  if (typeof value === 'string') {
    return {type: 'literal', value};
  } else {
    return value;
  }
};
const Call = (fn: string, arg: string) => {
  return {
    type: 'call',
    fn: Literal(fn),
    arg: Literal(arg),
  };
};
const Not = (child: JsAst | string): NotType => {
  return {
    type: 'not',
    child: (typeof child === 'string') ? Literal(child) : child,
  };
};
const ObjectLiteral = (object: {[key: string]: JsAst}): ObjectLiteralType => {
  return {
    type: 'objectliteral',
    object,
  };
};

export default {
  Function1,
  Binop: {
    Eq: _Binop('==='),
    Neq: _Binop('!=='),
    And: _Binop('&&'),
    Or: _Binop('||'),
    Lt: _Binop('<'),
    Gt: _Binop('>'),
    Lte: _Binop('<='),
    Gte: _Binop('>='),
    Any: _Binop,
  },
  Assignment,
  If,
  Return,
  Body,
  For,
  ForIn,
  Empty,
  Literal,
  Call,
  Not,
  ObjectLiteral,
};
