// @flow
import type {Context} from 'js/generate.js';
import type {JsAst} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';

const FailedCheck = (subSchema: JsonSchema, symbol: JsAst, context: Context): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return Ast.Binop.Neq(
    Ast.Call(fnSym, symbol),
    Ast.Null,
  );
};

const PassedCheck = (subSchema: JsonSchema, symbol: JsAst, context: Context): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return Ast.Binop.Eq(
    Ast.Call(fnSym, symbol),
    Ast.Null,
  );
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

const PrimitivePredicate = (type: BaseType, symbol: JsAst): JsAst => {
  switch (type) {
    case 'integer':
      return Ast.Binop.And(
        Ast.Binop.Eq(Ast.TypeOf(symbol), Ast.StringLiteral('number')),
        Ast.Binop.Eq(Ast.Binop.Mod(symbol, Ast.NumLiteral(1)), Ast.NumLiteral(0)),
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
          Ast.Unop.Not(Ast.Call('Array.isArray', symbol)),
        ),
      );
    case 'array':
      return Ast.Call('Array.isArray', symbol);
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
  PrimitivePredicate,
  TypeCheck,
};
