// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';
import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const predicate = (type: string | Object, symbol: string, context: Context): string => {
  if (typeof type === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    return util.primitivePredicate(type, symbol);
  } else {
    const fnSym = context.symbolForSchema(type);
    return `${fnSym}(${symbol}) === null`;
  }
};

const type = (schema: Object, symbol: string, context: Context): JsAst => {
  if (typeof schema.type === 'string') {
    return Ast.If(
      `!(${util.primitivePredicate(schema.type, symbol)})`,
      context.error(),
    );
  } else if (Array.isArray(schema.type)) {
    if (schema.type.length === 1) {
      return Ast.If(
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
      const checks = _.map(schema.type, (typeOrSubSchema) => {
        return Ast.If(
          `!(${predicate(typeOrSubSchema, symbol, context)})`,
          `${count}++;`,
        );
      });
      return Ast.Body(
        Ast.Assignment(count, '0'),
        Ast.Body(...checks),
        Ast.If(Ast.Binop.Eq(count, `${schema.type.length}`), context.error()),
      );
    } else {
      return Ast.Empty;
    }
  } else {
    return Ast.Empty;
  }
};

export default type;
