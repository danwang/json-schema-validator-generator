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
  ExprType
);
type AssignmentType = {
  type: 'assignment',
  variable: string,
  value: ExprType,
};
export type IfType = {
  type: 'if',
  predicate: ExprType,
  body: JsAst,
  elseBody: JsAst,
};
type ReturnType = {
  type: 'return',
  value: ExprType,
};
export type BodyType = {
  type: 'body',
  body: Array<JsAst>
};
export type ForType = {
  type: 'for',
  init: ExprType,
  condition: ExprType,
  loop: ExprType,
  body: JsAst,
};
export type ForInType = {
  type: 'forin',
  variable: string,
  iterator: ExprType,
  body: JsAst,
};
type EmptyType = {type: 'empty'};

// Expressions
export type ExprType = (
  Function1Type |
  BinopType |
  EmptyType |
  LiteralType
);
export type Function1Type = {
  type: 'function1',
  name: ?string,
  argument: string,
  body: JsAst,
};
type BinopType = {
  type: 'binop',
  left: ExprType,
  comparator: string,
  right: ExprType,
};
type LiteralType = {
  type: 'literal',
  value: string,
};

const Function1 = (argument: string, body: JsAst, name: ?string): Function1Type => {
  return {type: 'function1', argument, body, name};
};
const _Binop = (comparator: string) => (left: ExprType | string, right: ExprType | string): BinopType => {
  return {
    type: 'binop',
    comparator,
    left: (typeof left === 'string') ? Literal(left) : left,
    right: (typeof right === 'string') ? Literal(right) : right,
  };
};
const Assignment = (variable: string, value: ExprType | string): AssignmentType => {
  return {
    type: 'assignment',
    variable,
    value: (typeof value === 'string') ? Literal(value) : value,
  };
};
const If = (predicate: ExprType | string, body: JsAst | string, elseBody: JsAst | string = Empty): IfType => {
  return {
    type: 'if',
    predicate: (typeof predicate === 'string') ? Literal(predicate) : predicate,
    body: (typeof body === 'string') ? Literal(body) : body,
    elseBody: (typeof elseBody === 'string') ? Literal(elseBody) : elseBody,
  };
};
const Return = (value: ExprType | string): ReturnType => {
  return {
    type: 'return',
    value: (typeof value === 'string') ? Literal(value) : value,
  };
};
const Body = (...body: Array<JsAst>): BodyType => ({type: 'body', body});
const For = (
  init: ExprType,
  condition: ExprType,
  loop: ExprType,
  body: JsAst,
): ForType => ({type: 'for', init, condition, loop, body});
const ForIn = (variable: string, iterator: ExprType, body: JsAst): ForInType => {
  return {type: 'forin', variable, iterator, body};
};
const Empty = {type: 'empty'};
const Literal = (value: string): LiteralType => ({type: 'literal', value});

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
};
