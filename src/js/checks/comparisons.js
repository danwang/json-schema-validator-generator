// @flow
import util from 'util.js';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

type Field = (
  'minimum' |
  'maximum' |
  'exclusiveMinimum' |
  'exclusiveMaximum' |
  'minLength' |
  'maxLength' |
  'minItems' |
  'maxItems' |
  'minProperties' |
  'maxProperties'
);
type Binop = (JsAst, JsAst) => JsAst;

const comparisons = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const symbolLength = Ast.PropertyAccess(symbol, 'length');
  const keysLength = Ast.PropertyAccess(Ast.Call('Object.keys', symbol), 'length');

  const comparison = (
    sym: JsAst,
    comparator: Binop,
    field: Field,
  ): JsAst => {
    const base = schema[field];
    if (typeof base === 'number') {
      return Ast.If(
        comparator(sym, Ast.NumLiteral(base)),
        context.error(schema, field),
      );
    } else {
      return Ast.Empty;
    }
  };

  return Ast.Body(
    util.typeCheck('number', symbol, Ast.Body(
      comparison(symbol, schema.exclusiveMinimum ? Ast.Binop.Lte : Ast.Binop.Lt, 'minimum'),
      comparison(symbol, schema.exclusiveMaximum ? Ast.Binop.Gte : Ast.Binop.Gt, 'maximum'),
    )),
    util.typeCheck('string', symbol, Ast.Body(
      comparison(symbolLength, Ast.Binop.Lt, 'minLength'),
      comparison(symbolLength, Ast.Binop.Gt, 'maxLength'),
    )),
    util.typeCheck('array', symbol, Ast.Body(
      comparison(symbolLength, Ast.Binop.Lt, 'minItems'),
      comparison(symbolLength, Ast.Binop.Gt, 'maxItems'),
    )),
    util.typeCheck('object', symbol, Ast.Body(
      comparison(keysLength, Ast.Binop.Lt, 'minProperties'),
      comparison(keysLength, Ast.Binop.Gt, 'maxProperties'),
    )),
  );
};

export default comparisons;
