// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minItems = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minItems) {
    const checks = [
      `if (${symbol}.length < ${schema.minItems}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
    return util.typeCheck('array', symbol, checks);
  } else {
    return [];
  }
};

export default minItems;
