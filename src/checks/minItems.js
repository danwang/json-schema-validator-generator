// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minItems = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minItems) {
    const checks = util.ifs(
      `${symbol}.length < ${schema.minItems}`,
      context.error(),
    );
    return util.typeCheck('array', symbol, checks);
  } else {
    return [];
  }
};

export default minItems;
