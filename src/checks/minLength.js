// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const minLength = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.minLength) {
    return [
      `if (${symbol}.length < ${schema.minLength}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
  } else {
    return [];
  }
};

export default minLength;
