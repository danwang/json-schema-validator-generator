// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minimum = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minimum !== undefined) {
    const comparator = schema.exclusiveMinimum ? '<=' : '<';
    return util.ifs(
      `${symbol} ${comparator} ${schema.minimum}`,
      context.error(),
    );
  } else {
    return [];
  }
};

export default minimum;
