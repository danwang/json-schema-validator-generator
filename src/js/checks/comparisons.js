// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst, VarType} from 'js/jsast/ast.js';

// Generates all checks for
//   - minimum/maximum (number)
//   - minLength/maxLength (string)
//   - minItems/maxItems (array)
//   - minProperties/maxProperties (object)
const comparison = (
  symbol: JsAst,
  comparator: string,
  base: any,
  error: JsAst,
): JsAst => {
  if (base !== undefined) {
    return Ast.If(
      Ast.Binop.Any(comparator)(symbol, Ast.Literal(_.toString(base))),
      error,
    );
  } else {
    return Ast.Empty;
  }
};

const comparisons = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const error = context.error();
  const symbolLength = Ast.PropertyAccess(symbol, 'length');
  const keysLength = Ast.PropertyAccess(Ast.Call('Object.keys', symbol), 'length');
  return Ast.Body(
    util.typeCheck('number', symbol, Ast.Body(
      comparison(symbol, schema.exclusiveMinimum ? '<=' : '<', schema.minimum, error),
      comparison(symbol, schema.exclusiveMaximum ? '>=' : '>', schema.maximum, error),
    )),
    util.typeCheck('string', symbol, Ast.Body(
      comparison(symbolLength, '<', schema.minLength, error),
      comparison(symbolLength, '>', schema.maxLength, error),
    )),
    util.typeCheck('array', symbol, Ast.Body(
      comparison(symbolLength, '<', schema.minItems, error),
      comparison(symbolLength, '>', schema.maxItems, error),
    )),
    util.typeCheck('object', symbol, Ast.Body(
      comparison(keysLength, '<', schema.minProperties, error),
      comparison(keysLength, '>', schema.maxProperties, error),
    )),
  );
};

export default comparisons;
