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
  BracketAccessType |
  TypeOfType
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
  fn: JsAst,
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
export type TypeOfType = {
  type: 'typeof',
  child: JsAst,
};

const Function1 = (
  name: VarType,
  argument: VarType,
  body: JsAst,
): Function1Type => ({
  type: 'function1',
  name,
  argument,
  body: Body(body),
});
const _Binop = (comparator: string) => (left: JsAst, right: JsAst): BinopType => {
  return {
    type: 'binop',
    comparator,
    left,
    right,
  };
};
const Assignment = (variable: JsAst, value: JsAst): AssignmentType => {
  return {
    type: 'assignment',
    variable,
    value,
  };
};
const If = (predicate: JsAst, body: JsAst, elseBody: JsAst = Empty): IfType => {
  return {
    type: 'if',
    predicate,
    body: Body(body),
    elseBody: Body(elseBody),
  };
};
const Return = (value: JsAst): ReturnType => {
  return {
    type: 'return',
    value,
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
  variable: VarType,
  iterator: JsAst,
  body: JsAst,
): ForInType => ({
  type: 'forin',
  variable,
  iterator,
  body: Body(body),
});
const Empty = {type: 'empty'};
const Var = (value: string): VarType => {
  return {type: 'var', value};
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
const Call = (fn: JsAst | string, arg: JsAst) => {
  return {
    type: 'call',
    fn: (typeof fn === 'string') ? Literal(fn) : fn,
    arg,
  };
};
const _Unop = (op: string, style: 'prefix' | 'suffix') => (child: JsAst): UnopType => {
  return {
    type: 'unop',
    child,
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
const PropertyAccess = (obj: JsAst, property: string): PropertyAccessType => {
  return {
    type: 'propertyaccess',
    obj,
    property,
  };
};
const BracketAccess = (obj: JsAst, property: JsAst): BracketAccessType => {
  return {
    type: 'bracketaccess',
    obj,
    property,
  };
};
const TypeOf = (child: JsAst): TypeOfType => {
  return {
    type: 'typeof',
    child,
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
    Mod: _Binop('%'),
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
  TypeOf,
  Null: Literal('null'),
  Undefined: Literal('undefined'),
  True: Literal('true'),
  False: Literal('false'),
};
