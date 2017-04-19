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
  VarType |
  LiteralType |
  CallType |
  UnopType |
  ObjectLiteralType |
  PropertyAccessType |
  BracketAccessType
);
type AssignmentType = {
  type: 'assignment',
  variable: JsAst,
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
  variable: VarType,
  iterator: JsAst,
  body: JsAst,
};
type EmptyType = {type: 'empty'};

export type Function1Type = {
  type: 'function1',
  name: VarType,
  argument: VarType,
  body: JsAst,
};
type BinopType = {
  type: 'binop',
  left: JsAst,
  comparator: string,
  right: JsAst,
};
export type VarType = {
  type: 'var',
  value: string,
};
export type LiteralType = {
  type: 'literal',
  value: string,
};
type CallType = {
  type: 'call',
  fn: VarType,
  arg: JsAst,
};
export type UnopType = {
  type: 'unop',
  op: string,
  child: JsAst,
  style: 'prefix' | 'suffix',
};
export type ObjectLiteralType = {
  type: 'objectliteral',
  object: {[key: string]: JsAst},
};
export type PropertyAccessType = {
  type: 'propertyaccess',
  obj: JsAst,
  property: string,
};
export type BracketAccessType = {
  type: 'bracketaccess',
  obj: JsAst,
  property: JsAst,
};

const Function1 = (
  name: VarType | string,
  argument: VarType | string,
  body: JsAst,
): Function1Type => ({
  type: 'function1',
  name: Var(name),
  argument: Var(argument),
  body: Body(body),
});
const _Binop = (comparator: string) => (left: JsAst | string, right: JsAst | string): BinopType => {
  return {
    type: 'binop',
    comparator,
    left: (typeof left === 'string') ? Literal(left) : left,
    right: (typeof right === 'string') ? Literal(right) : right,
  };
};
const Assignment = (variable: JsAst | string, value: JsAst): AssignmentType => {
  return {
    type: 'assignment',
    variable: (typeof variable === 'string') ? Literal(variable) : variable,
    value,
  };
};
const If = (predicate: JsAst | string, body: JsAst | string, elseBody: JsAst | string = Empty): IfType => {
  return {
    type: 'if',
    predicate: (typeof predicate === 'string') ? Literal(predicate) : predicate,
    body: Body((typeof body === 'string') ? Literal(body) : body),
    elseBody: Body((typeof elseBody === 'string') ? Literal(elseBody) : elseBody),
  };
};
const Return = (value: JsAst | string): ReturnType => {
  return {
    type: 'return',
    value: (typeof value === 'string') ? Literal(value) : value,
  };
};
const Body = (...body: Array<JsAst>): BodyType | EmptyType => {
  if (body.length === 1 && (body[0].type === 'body' || body[0].type === 'empty')) {
    return body[0];
  } else {
    return {type: 'body', body};
  }
};
const For = (
  init: JsAst,
  condition: JsAst,
  loop: JsAst,
  body: JsAst,
): ForType => ({type: 'for', init, condition, loop, body});
const ForIn = (
  variable: VarType | string,
  iterator: JsAst,
  body: JsAst,
): ForInType => ({
  type: 'forin',
  variable: Var(variable),
  iterator,
  body: Body(body),
});
const Empty = {type: 'empty'};
const Var = (value: VarType | string): VarType => {
  if (typeof value === 'string') {
    return {type: 'var', value};
  } else {
    return value;
  }
};
const Literal = (value: LiteralType | string | number): LiteralType => {
  if (typeof value === 'number') {
    return {type: 'literal', value: `${value}`};
  } else if (typeof value === 'string') {
    return {type: 'literal', value};
  } else {
    return value;
  }
};
const Call = (fn: string, arg: JsAst | string) => {
  return {
    type: 'call',
    fn: Var(fn),
    arg: (typeof arg === 'string') ? Literal(arg) : arg,
  };
};
const _Unop = (op: string, style: 'prefix' | 'suffix') => (child: JsAst | string): UnopType => {
  return {
    type: 'unop',
    child: (typeof child === 'string') ? Literal(child) : child,
    op,
    style,
  };
};
const ObjectLiteral = (object: {[key: string]: JsAst}): ObjectLiteralType => {
  return {
    type: 'objectliteral',
    object,
  };
};
const PropertyAccess = (obj: JsAst | string, property: string): PropertyAccessType => {
  return {
    type: 'propertyaccess',
    obj: (typeof obj === 'string') ? Literal(obj) : obj,
    property,
  };
};
const BracketAccess = (obj: JsAst | string, property: JsAst | string): BracketAccessType => {
  return {
    type: 'bracketaccess',
    obj: (typeof obj === 'string') ? Literal(obj) : obj,
    property: (typeof property === 'string') ? Literal(property) : property,
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
    Div: _Binop('/'),
    Any: _Binop,
  },
  Assignment,
  If,
  Return,
  Body,
  For,
  ForIn,
  Empty,
  Var,
  Literal,
  Call,
  Unop: {
    Not: _Unop('!', 'prefix'),
    Incr: _Unop('++', 'suffix'),
    Any: _Unop,
  },
  ObjectLiteral,
  PropertyAccess,
  BracketAccess,
  Null: Literal('null'),
  Undefined: Literal('undefined'),
  True: Literal('true'),
  False: Literal('false'),
};
