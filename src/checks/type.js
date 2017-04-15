// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';

const predicate = (type: string | Object, symbol: string, context: Context): string => {
  if (typeof type === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    return util.primitivePredicate(type, symbol);
  } else {
    const fnSym = context.symbolForSchema(type);
    return `${fnSym}(${symbol}) === null`;
  }
};

const type = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (typeof schema.type === 'string') {
    return util.ifs(
      `!(${util.primitivePredicate(schema.type, symbol)})`,
      context.error(),
    );
  } else if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return util.ifs(
        `!(${predicate(schema.type[0], symbol, context)})`,
        context.error(),
      );
    } else if (schema.type.length > 1) {
      // var count = 0;
      //
      // if (check1(data) === null) { count++ }
      // if (check2(data) === null) { count++ }
      //
      // if (count !== 1) { (error) }
      const count = context.gensym();
      const checks = _.flatMap(schema.type, (typeOrSubSchema) => {
        return util.ifs(
          `!(${predicate(typeOrSubSchema, symbol, context)})`,
          `${count}++;`,
        );
      });
      return [
        `var ${count} = 0;`,
        ...checks,
        ...util.ifs(
          `${count} === ${schema.type.length}`,
          context.error(),
        ),
      ];
    } else {
      return [];
    }
  } else {
    return [];
  }
};

export default type;
