// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maxItems = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maxItems) {
    const checks = util.ifs(
      `${symbol}.length > ${schema.maxItems}`,
      context.error(),
    );
    return util.typeCheck('array', symbol, checks);
  } else {
    return [];
  }
};

export default maxItems;
