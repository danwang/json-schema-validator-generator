// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minLength = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minLength) {
    return util.ifs(
      `${symbol}.length < ${schema.minLength}`,
      context.error(),
    );
  } else {
    return [];
  }
};

export default minLength;
