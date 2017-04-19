// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const predicate = (type: string | JsonSchema, symbol: string, context: Context) => {
  if (typeof type === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    return util.primitivePredicate(type, symbol);
  } else {
    const fnSym = context.symbolForSchema(type);
    return Ast.Binop.Eq(Ast.Call(fnSym, symbol), 'null');
  }
};

const _type = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  const {type} = schema;
  if (typeof type === 'string') {
    return Ast.If(
      Ast.Unop.Not(util.primitivePredicate(type, symbol)),
      context.error(),
    );
  } else if (Array.isArray(type)) {
    if (type.length === 1) {
      return Ast.If(
        Ast.Unop.Not(predicate(type[0], symbol, context)),
        context.error(),
      );
    } else if (type.length > 1) {
      // var count = 0;
      //
      // if (check1(data) === null) { count++ }
      // if (check2(data) === null) { count++ }
      //
      // if (count !== 1) { (error) }
      const count = context.gensym();
      const checks = _.map(type, (typeOrSubSchema) => {
        return Ast.If(
          Ast.Unop.Not(predicate(typeOrSubSchema, symbol, context)),
          Ast.Unop.Incr(count),
        );
      });
      return Ast.Body(
        Ast.Assignment(count, Ast.Literal('0')),
        Ast.Body(...checks),
        Ast.If(Ast.Binop.Eq(count, `${type.length}`), context.error()),
      );
    } else {
      return Ast.Empty;
    }
  } else {
    return Ast.Empty;
  }
};

export default _type;
