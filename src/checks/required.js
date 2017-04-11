// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../index.js';

const required = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (Array.isArray(schema.required)) {
    const checks = _.flatMap(schema.required, (property) => {
      return [
        `if (${symbol}.${property} === undefined) {`,
        ...context.error().map(util.indent),
        '}',
      ];
    });
    return util.typeCheck('object', symbol, checks);
  } else {
    return [];
  }
};

export default required;
