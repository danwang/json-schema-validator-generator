// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';

const oneOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.oneOf) {
    // var count = 0;
    //
    // if (check1(data) === null) { count++ }
    // if (check2(data) === null) { count++ }
    //
    // if (count !== 1) { (error) }
    const count = context.gensym();
    const checks = _.flatMap(schema.oneOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      return util.ifs(
        `${fnSym}(${symbol}) === null`,
        `${count}++;`,
      );
    });
    return [
      `var ${count} = 0;`,
      ...checks,
      ...util.ifs(
        `${count} !== 1`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default oneOf;
