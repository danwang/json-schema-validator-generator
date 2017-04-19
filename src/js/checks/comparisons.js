// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

// Generates all checks for
//   - minimum/maximum (number)
//   - minLength/maxLength (string)
//   - minItems/maxItems (array)
//   - minProperties/maxProperties (object)
const comparison = (
  symbol: string,
  comparator: string,
  base: any,
  error: JsAst,
): JsAst => {
  if (base !== undefined) {
    return Ast.If(
      Ast.Binop.Any(comparator)(symbol, _.toString(base)),
      error,
    );
  } else {
    return Ast.Empty;
  }
};

const comparisons = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  const error = context.error();
  return Ast.Body(
    util.typeCheck('number', symbol, Ast.Body(
      comparison(symbol, schema.exclusiveMinimum ? '<=' : '<', schema.minimum, error),
      comparison(symbol, schema.exclusiveMaximum ? '>=' : '>', schema.maximum, error),
    )),
    util.typeCheck('string', symbol, Ast.Body(
      comparison(`${symbol}.length`, '<', schema.minLength, error),
      comparison(`${symbol}.length`, '>', schema.maxLength, error),
    )),
    util.typeCheck('array', symbol, Ast.Body(
      comparison(`${symbol}.length`, '<', schema.minItems, error),
      comparison(`${symbol}.length`, '>', schema.maxItems, error),
    )),
    util.typeCheck('object', symbol, Ast.Body(
      comparison(`Object.keys(${symbol}).length`, '<', schema.minProperties, error),
      comparison(`Object.keys(${symbol}).length`, '>', schema.maxProperties, error),
    )),
  );
};

export default comparisons;
