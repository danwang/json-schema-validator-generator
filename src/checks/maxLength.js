// @flow
import util from '../util.js';
import type {Context} from '../index.js';

const maxLength = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.maxLength) {
    return [
      `if (${symbol}.length > ${schema.maxLength}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
  } else {
    return [];
  }
};

export default maxLength;
