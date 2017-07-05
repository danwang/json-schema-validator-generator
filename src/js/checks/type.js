// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const predicate = (
  type: string | JsonSchema,
  symbol: VarType,
  context: Context
) => {
  if (typeof type === 'string') {
    // $FlowFixMe Wait until we can refine string -> enum
    return Ast.Unop.Not(M.PrimitivePredicate(type, symbol));
  } else {
    return M.FailedCheck(type, symbol, context);
  }
};

const _type = (
  schema: JsonSchema,
  symbol: VarType,
  context: Context
): JsAst => {
  const {type} = schema;
  const error = context.error(schema, 'type');
  if (typeof type === 'string') {
    return Ast.If(predicate(type, symbol, context), error);
  } else if (Array.isArray(type)) {
    if (type.length === 1) {
      return Ast.If(predicate(type[0], symbol, context), error);
    } else if (type.length > 1) {
      // var count = 0;
      //
      // if (check1(data) === null) { count++ }
      // if (check2(data) === null) { count++ }
      //
      // if (count !== 1) { (error) }
      const count = context.gensym();
      const checks = _.map(type, typeOrSubSchema => {
        return Ast.If(
          predicate(typeOrSubSchema, symbol, context),
          Ast.Unop.Incr(count)
        );
      });
      return Ast.Body(
        Ast.Assignment(count, Ast.NumLiteral(0)),
        Ast.Body(...checks),
        Ast.If(Ast.Binop.Eq(count, Ast.NumLiteral(type.length)), error)
      );
    } else {
      return Ast.Empty;
    }
  } else {
    return Ast.Empty;
  }
};

export default _type;
