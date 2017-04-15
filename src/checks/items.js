// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';

const items = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (Array.isArray(schema.items)) {
    // Tuple. Handle each item individually.
    return _.flatMap(schema.items, (subSchema, i) => {
      const fnSym = context.symbolForSchema(subSchema);
      return [
        ...util.ifs(
          `${i} < ${symbol}.length && ${fnSym}(${symbol}[${i}]) !== null`,
          context.error(),
        ),
      ];
    });
  } else if (schema.items) {
    const fnSym = context.symbolForSchema(schema.items);
    const counter = context.gensym();
    const result = context.gensym();
    const loop = [
      `var ${counter} = 0;`,
      `var ${result} = null;`,
      `for (; ${counter} < ${symbol}.length; ${counter}++) {`,
      util.indent(`${result} = ${fnSym}(${symbol}[${counter}])`),
      ...util.ifs(
        `${result} !== null`,
        `return ${result}`,
      ).map(util.indent),
      '}',
    ];
    return util.typeCheck('array', symbol, loop);
  } else {
    return [];
  }
};

export default items;
