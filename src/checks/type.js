// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';
import root from './root.js';

const typeOrSchema = (tos: string | Object, symbol: string, context: Context): Array<string> => {
  if (typeof tos === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    const predicate = util.primitivePredicate(tos, symbol);
    return util.ifs(`!(${predicate})`, context.error());
  } else {
    return root(tos, symbol, context);
  }
};

const type = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (typeof schema.type === 'string') {
    return typeOrSchema(schema.type, symbol, context);
  } else if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return typeOrSchema(schema.type[0], symbol, context);
    } else if (schema.type.length > 1) {
      if (_.every(schema.type, (t) => (typeof t === 'string'))) {
        const predicate = _.map(schema.type, (t: string) => {
          // $FlowFixMe Wait until we can refine string -> enum
          return `(${util.primitivePredicate(t, symbol)})`;
        }).join(' || ');
        return util.ifs(`!(${predicate})`, context.error());
      } else {
        const countSym = context.gensym();
        const errorSym = context.gensym();
        const subcontext = {
          ...context,
          error: () => [`${errorSym} = true;`],
        };
        const checks = _.flatMap(schema.type, (typeOrSubSchema) => {
          return [
            `${errorSym} = false;`,
            ...typeOrSchema(typeOrSubSchema, symbol, subcontext),
            `${errorSym} && ${countSym}++;`,
          ];
        });
        return [
          `var ${countSym} = 0;`,
          `var ${errorSym};`,
          ...checks,
          ...util.ifs(
            `${countSym} === 0`,
            context.error(),
          ),
        ];
      }
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export default type;
