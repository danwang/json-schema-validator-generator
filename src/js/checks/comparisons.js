// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

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
type Binop = (left: JsAst, right: JsAst) => JsAst;

const comparisons = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const symbolLength = Ast.PropertyAccess(symbol, 'length');
  const keysLength = Ast.PropertyAccess(Ast.Call1('Object.keys', symbol), 'length');

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
    M.TypeCheck('number', symbol, Ast.Body(
      comparison(symbol, schema.exclusiveMinimum ? Ast.Binop.Lte : Ast.Binop.Lt, 'minimum'),
      comparison(symbol, schema.exclusiveMaximum ? Ast.Binop.Gte : Ast.Binop.Gt, 'maximum'),
    )),
    M.TypeCheck('string', symbol, Ast.Body(
      comparison(symbolLength, Ast.Binop.Lt, 'minLength'),
      comparison(symbolLength, Ast.Binop.Gt, 'maxLength'),
    )),
    M.TypeCheck('array', symbol, Ast.Body(
      comparison(symbolLength, Ast.Binop.Lt, 'minItems'),
      comparison(symbolLength, Ast.Binop.Gt, 'maxItems'),
    )),
    M.TypeCheck('object', symbol, Ast.Body(
      comparison(keysLength, Ast.Binop.Lt, 'minProperties'),
      comparison(keysLength, Ast.Binop.Gt, 'maxProperties'),
    )),
  );
};

export default comparisons;
