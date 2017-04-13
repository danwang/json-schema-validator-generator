// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../index.js';
import root from './root.js';

const oneOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.oneOf) {
    // To validate oneOf, we count errors using a boolean and a count:
    //   var count = 0;
    //   var error;
    //
    //   error = false;
    //   (subschema 1)
    //   error && count++;
    //
    //   error = false;
    //   (subschema 1)
    //   error && count++;
    //
    //   if (count !== total - 1) {
    //     (doesn't match oneOf)
    //   }
    //
    const countSym = context.gensym();
    const errorSym = context.gensym();
    const subcontext = {
      ...context,
      error: () => [`${errorSym} = true;`],
    };
    const checks = _.flatMap(schema.oneOf, (subSchema) => {
      return [
        `${errorSym} = false;`,
        ...root(subSchema, symbol, subcontext).map(util.indent),
        `${errorSym} && ${countSym}++;`,
      ];
    });
    return [
      `var ${countSym} = 0;`,
      `var ${errorSym};`,
      ...checks,
      ...util.ifs(
        `${countSym} !== ${schema.oneOf.length} - 1`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default oneOf;
