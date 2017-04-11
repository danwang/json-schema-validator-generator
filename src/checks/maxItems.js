// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maxItems = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maxItems) {
    const checks = [
      `if (${symbol}.length > ${schema.maxItems}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
    return util.typeCheck('array', symbol, checks);
  } else {
    return [];
  }
};

export default maxItems;
