// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const pattern = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.pattern) {
    const check = [
      `if (!${symbol}.match(/${schema.pattern}/)) {`,
      ...context.error().map(util.indent),
      '}',
    ];
    return util.typeCheck('string', symbol, check);
  } else {
    return [];
  }
};

export default pattern;
