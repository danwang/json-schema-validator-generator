// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minimum = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minimum !== undefined) {
    const comparator = schema.exclusiveMinimum ? '<=' : '<';
    return [
      `if (${symbol} ${comparator} ${schema.minimum}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
  } else {
    return [];
  }
};

export default minimum;
