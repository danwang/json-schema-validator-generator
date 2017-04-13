// @flow
import _ from 'lodash';
import type {Context} from '../index.js';
import root from './root.js';
import util from '../util.js';

const anyOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.anyOf) {
    const countSym = context.gensym();
    const errorSym = context.gensym();
    const subcontext = {
      ...context,
      error: () => [`${errorSym} = true;`],
    };
    const checks = _.flatMap(schema.anyOf, (subSchema) => {
      return [
        `${errorSym} = false;`,
        ...root(subSchema, symbol, subcontext),
        `${errorSym} && ${countSym}++;`,
      ];
    });
    return [
      `var ${countSym} = 0;`,
      `var ${errorSym};`,
      ...checks,
      ...util.ifs(
        `${countSym} === ${schema.anyOf.length}`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default anyOf;
