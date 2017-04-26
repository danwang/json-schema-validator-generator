// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

const predicate = (type: string | JsonSchema, symbol: VarType, context: Context) => {
  if (typeof type === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    return util.primitivePredicate(type, symbol);
  } else {
    const fnSym = context.symbolForSchema(type);
    return Ast.Binop.Eq(Ast.Call(fnSym, symbol), Ast.Null);
  }
};

const _type = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const {type} = schema;
  const error = context.error(schema, 'type');
  if (typeof type === 'string') {
    return Ast.If(
      Ast.Unop.Not(util.primitivePredicate(type, symbol)),
      error,
    );
  } else if (Array.isArray(type)) {
    if (type.length === 1) {
      return Ast.If(
        Ast.Unop.Not(predicate(type[0], symbol, context)),
        error,
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
        Ast.Assignment(count, Ast.NumLiteral(0)),
        Ast.Body(...checks),
        Ast.If(Ast.Binop.Eq(count, Ast.NumLiteral(type.length)), error),
      );
    } else {
      return Ast.Empty;
    }
  } else {
    return Ast.Empty;
  }
};

export default _type;
