// @flow
import util from '../util.js';
import type {Context} from '../types.js';

const not = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.not) {
    const fnSym = context.symbolForSchema(schema.not);
    const result = context.gensym();

    return [
      `var ${result} = ${fnSym}(${symbol});`,
      ...util.ifs(
        `${result} === null`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default not;
