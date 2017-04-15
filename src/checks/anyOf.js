// @flow
import _ from 'lodash';
import type {Context} from '../types.js';
import util from '../util.js';

const anyOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.anyOf) {
    // var count = 0;
    // check1(schema) === null && count++;
    // check2(schema) === null && count++;
    // if (count === 0) { (error) }
    const countSym = context.gensym();
    const checks = _.map(schema.anyOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      return `(${fnSym}(${symbol}) === null) && ${countSym}++`;
    });
    return [
      `var ${countSym} = 0;`,
      ...checks,
      ...util.ifs(
        `${countSym} === 0`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default anyOf;
