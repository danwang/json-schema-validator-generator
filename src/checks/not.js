// @flow
import util from '../util.js';
import type {Context} from '../index.js';
import root from './root.js';

const not = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.not) {
    const errorSym = context.gensym();
    const subcontext = {
      ...context,
      error: () => [`${errorSym} = true;`],
    };
    return [
      `var ${errorSym} = false;`,
      ...root(schema.not, symbol, subcontext),
      `if (!${errorSym}) {`,
      ...context.error().map(util.indent),
      '}',
    ];
  } else {
    return [];
  }
};

export default not;
