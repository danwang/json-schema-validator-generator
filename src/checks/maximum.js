// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maximum = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maximum !== undefined) {
    const comparator = schema.exclusiveMaximum ? '>=' : '>';
    return util.ifs(
      `${symbol} ${comparator} ${schema.maximum}`,
      context.error(),
    );
  } else {
    return [];
  }
};

export default maximum;
