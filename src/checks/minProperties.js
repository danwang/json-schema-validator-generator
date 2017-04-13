// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minProperties = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minProperties !== undefined) {
    const check = util.ifs(
      `Object.keys(${symbol}).length < ${schema.minProperties}`,
      context.error(),
    );
    return util.typeCheck('object', symbol, check);
  } else {
    return [];
  }
};

export default minProperties;
