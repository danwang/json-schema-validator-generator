// @flow
import _ from 'lodash';
import type {Context} from '../index.js';
import root from './root.js';

const oneOf = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.allOf) {
    return _.flatMap(schema.allOf, (subSchema) => root(subSchema, symbol, context));
  } else {
    return [];
  }
};

export default oneOf;
