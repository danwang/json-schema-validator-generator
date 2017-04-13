// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maxLength = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maxLength) {
    return util.ifs(
      `${symbol}.length > ${schema.maxLength}`,
      context.error(),
    );
  } else {
    return [];
  }
};

export default maxLength;
