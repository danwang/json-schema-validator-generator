// @flow
import _ from 'lodash';
import type {Context} from '../types.js';
import util from '../util.js';

const _enum = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.enum) {
    const match = context.gensym();
    const checks = _.flatMap(schema.enum, (value) => {
      if (typeof value === 'number' || typeof value === 'boolean') {
        return util.ifs(
          `${symbol} === ${value}`,
          `${match}++;`,
        );
      } else if (typeof value === 'string') {
        return util.ifs(
          `${symbol} === "${value}"`,
          `${match}++;`,
        );
      } else {
        return util.ifs(
          `JSON.stringify(${symbol}) === '${JSON.stringify(value)}'`,
          `${match}++;`,
        );
      }
    });
    return [
      `var ${match} = 0;`,
      ...checks,
      ...util.ifs(
        `${match} === 0`,
        context.error(),
      ),
    ];
  } else {
    return [];
  }
};

export default _enum;
