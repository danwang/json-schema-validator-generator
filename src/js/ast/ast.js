// @flow
/* eslint-disable no-use-before-define */
import type {JsonSchema} from 'generated-types.js';

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
  Call0Type |
  Call1Type |
  Call2Type |
  UnopType |
  ObjectLiteralType |
  PropertyAccessType |
  BracketAccessType |
  TypeOfType |
  CommentType |
  ErrorType
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
type Call0Type = {
  type: 'call0',
  fn: JsAst,
};
type Call1Type = {
  type: 'call1',
  fn: JsAst,
  arg: JsAst,
};
type Call2Type = {
  type: 'call2',
  fn: JsAst,
  arg1: JsAst,
  arg2: JsAst,
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
export type CommentType = {
  type: 'comment',
  comment: string,
};
export type ErrorType = {
  type: 'error',
  schema: JsonSchema,
  reason: string,
  subreason: ?JsAst,
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
): ForType => ({
  type: 'for',
  init,
  condition,
  loop,
  body: Body(body),
});
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
const Var = (value: string): VarType => ({type: 'var', value});
const Literal = (value: string): LiteralType => ({type: 'literal', value});
const Call0 = (fn: JsAst | string): Call0Type => {
  return {
    type: 'call0',
    fn: (typeof fn === 'string') ? Literal(fn) : fn,
  };
};
const Call1 = (fn: JsAst | string, arg: JsAst): Call1Type => {
  return {
    type: 'call1',
    fn: (typeof fn === 'string') ? Literal(fn) : fn,
    arg,
  };
};
const Call2 = (fn: JsAst | string, arg1: JsAst, arg2: JsAst): Call2Type => {
  return {
    type: 'call2',
    fn: (typeof fn === 'string') ? Literal(fn) : fn,
    arg1,
    arg2,
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
const Comment = (comment: string): CommentType => ({type: 'comment', comment});
const Error = (schema: JsonSchema, reason: string, subreason: ?JsAst): ErrorType => {
  return {
    type: 'error',
    schema,
    reason,
    subreason,
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
  Call0,
  Call1,
  Call2,
  Unop: {
    Not: _Unop('!', 'prefix'),
    Incr: _Unop('++', 'suffix'),
    Any: _Unop,
  },
  ObjectLiteral,
  PropertyAccess,
  BracketAccess,
  TypeOf,
  Comment,
  Error,
  Null: Literal('null'),
  Undefined: Literal('undefined'),
  True: Literal('true'),
  False: Literal('false'),
  NumLiteral: (n: number) => Literal(`${n}`),
  StringLiteral: (s: string) => Literal(`'${s}'`),
};
