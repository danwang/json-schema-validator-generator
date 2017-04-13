// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../index.js';

const schemaPredicate = (schema: Object, symbol: string): ?string => {
  if (typeof schema.type === 'string') {
    return util.primitivePredicate((schema.type: any), symbol);
  } else if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return util.primitivePredicate((schema.type[0]: any), symbol);
    } else if (schema.type.length > 1) {
      return _.map(schema.type, (type: string) => {
        return `(${util.primitivePredicate((type: any), symbol)})`;
      }).join(' || ');
    } else {
      return null;
    }
  } else {
    return null;
  }
};

const type = (schema: Object, symbol: string, context: Context): Array<string> => {
  const check = schemaPredicate(schema, symbol);
  if (check) {
    return util.ifs(
      `!(${check})`,
      context.error(),
    );
  } else {
    return [];
  }
};

export default type;
