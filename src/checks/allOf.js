// @flow
import _ from 'lodash';
import type {Context} from '../types.js';
import util from '../util.js';

const allOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.allOf) {
    return _.flatMap(schema.allOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      const resultSym = context.gensym();
      return [
        `var ${resultSym} = ${fnSym}(${symbol});`,
        ...util.ifs(
          `${resultSym} !== null`,
          context.error(),
        ),
      ];
    });
  } else {
    return [];
  }
};

export default allOf;
