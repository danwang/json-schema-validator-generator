// @flow
import util from '../util.js';
import type {Context} from '../index.js';

// Generates all checks for
//   - minimum/maximum (number)
//   - minLength/maxLength (string)
//   - minItems/maxItems (array)
//   - minProperties/maxProperties (object)
const comparison = (symbol: string, comparator: string, base: any, error: Array<string>): Array<string> => {
  if (base !== undefined) {
    return util.ifs(`${symbol} ${comparator} ${base}`, error);
  } else {
    return [];
  }
};

const comparisons = (schema: Object, symbol: string, context: Context): Array<string> => {
  const error = context.error();
  return [
    ...util.typeCheck('number', symbol, [
      ...comparison(symbol, schema.exclusiveMinimum ? '<=' : '<', schema.minimum, error),
      ...comparison(symbol, schema.exclusiveMaximum ? '>=' : '>', schema.maximum, error),
    ]),
    ...util.typeCheck('string', symbol, [
      ...comparison(`${symbol}.length`, '<', schema.minLength, error),
      ...comparison(`${symbol}.length`, '>', schema.maxLength, error),
    ]),
    ...util.typeCheck('array', symbol, [
      ...comparison(`${symbol}.length`, '<', schema.minItems, error),
      ...comparison(`${symbol}.length`, '>', schema.maxItems, error),
    ]),
    ...util.typeCheck('object', symbol, [
      ...comparison(`Object.keys(${symbol}).length`, '<', schema.minProperties, error),
      ...comparison(`Object.keys(${symbol}).length`, '>', schema.maxProperties, error),
    ]),
  ];
};

export default comparisons;
