// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maxProperties = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maxProperties !== undefined) {
    const check = util.ifs(
      `Object.keys(${symbol}).length > ${schema.maxProperties}`,
      context.error(),
    );
    return util.typeCheck('object', symbol, check);
  } else {
    return [];
  }
};

export default maxProperties;
