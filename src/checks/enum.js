// @flow
import _ from 'lodash';
import type {Context} from '../index.js';
import util from '../util.js';

const _enum = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.enum) {
    const match = context.gensym();
    const checks = _.flatMap(schema.enum, (value) => {
      if (typeof value === 'number' || typeof value === 'boolean') {
        return [
          `if (${symbol} === ${value}) {`,
          util.indent(`${match}++;`),
          '}',
        ];
      } else if (typeof value === 'string') {
        return [
          `if (${symbol} === "${value}") {`,
          util.indent(`${match}++;`),
          '}',
        ];
      } else {
        return [
          `if (JSON.stringify(${symbol}) === '${JSON.stringify(value)}') {`,
          util.indent(`${match}++;`),
          '}',
        ];
      }
    });
    return [
      `var ${match} = 0;`,
      ...checks,
      `if (${match} === 0) {`,
      ...context.error().map(util.indent),
      '}',
    ];
  } else {
    return [];
  }
};

export default _enum;
