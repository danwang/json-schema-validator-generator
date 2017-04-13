// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../index.js';
import root from './root.js';

const items = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (Array.isArray(schema.items)) {
    return _.flatMap(schema.items, (subSchema, i) => {
      const item = context.gensym();
      return [
        `var ${item} = ${symbol}[${i}];`,
        ...util.ifs(
          `${item} !== undefined`,
          root(subSchema, item, context),
        ),
      ];
    });
  } else if (schema.items) {
    const loopSym = context.gensym();
    const loop = [
      `var ${loopSym} = 0;`,
      `for (; ${loopSym} < ${symbol}.length; ${loopSym}++) {`,
      ...root(schema.items, `${symbol}[${loopSym}]`, context),
      '}',
    ];
    return util.typeCheck('array', symbol, loop);
  } else {
    return [];
  }
};

export default items;
