// @flow
import type {Context} from 'js/generate.js';
import type {JsAst} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';
import type {JsonSchema} from 'generated-types.js';

const IsError = (symbol: JsAst): JsAst => {
  return Ast.Binop.Neq(symbol, Ast.NumLiteral(0));
};

const FailedCheck = (
  subSchema: JsonSchema,
  symbol: JsAst,
  context: Context
): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return IsError(Ast.Call1(fnSym, symbol));
};

const PassedCheck = (
  subSchema: JsonSchema,
  symbol: JsAst,
  context: Context
): JsAst => {
  return Ast.Unop.Not(FailedCheck(subSchema, symbol, context));
};

const Check = (subSchema: JsonSchema, symbol: JsAst, context: Context) => {
  const check = context.symbolForSchema(subSchema);
  return Ast.Call1(check, symbol);
};

export type BaseType =
  | 'integer'
  | 'number'
  | 'string'
  | 'object'
  | 'array'
  | 'boolean'
  | 'null';

const PrimitivePredicate = (type: BaseType, symbol: JsAst): JsAst => {
  switch (type) {
    case 'integer':
      return Ast.Binop.And(
        Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('number')),
        Ast.Binop.Eq(
          Ast.Binop.Mod(symbol, Ast.NumLiteral(1)),
          Ast.NumLiteral(0)
        )
      );
    case 'number':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('number'));
    case 'string':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('string'));
    case 'object':
      return Ast.Binop.And(
        symbol,
        Ast.Binop.And(
          Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('object')),
          Ast.Unop.Not(Ast.Call1('Array.isArray', symbol))
        )
      );
    case 'array':
      return Ast.Call1('Array.isArray', symbol);
    case 'boolean':
      return Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('boolean'));
    case 'null':
      return Ast.Binop.Eq(symbol, Ast.Null);
    default:
      return Ast.False;
  }
};

const TypeCheck = (type: BaseType, symbol: JsAst, body: JsAst): JsAst => {
  return Ast.If(PrimitivePredicate(type, symbol), body);
};

export default {
  FailedCheck,
  PassedCheck,
  IsError,
  Check,
  PrimitivePredicate,
  TypeCheck,
};
