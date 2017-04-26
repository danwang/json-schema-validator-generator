// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const oneOf = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.oneOf) {
    // var count = 0;
    //
    // if (check1(data) === null) { count++ }
    // if (check2(data) === null) { count++ }
    //
    // if (count !== 1) { (error) }
    const count = context.gensym();
    const checks = _.map(schema.oneOf, (subSchema) => {
      return Ast.If(
        M.PassedCheck(subSchema, symbol, context),
        Ast.Unop.Incr(count),
      );
    });
    return Ast.Body(
      Ast.Assignment(count, Ast.NumLiteral(0)),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Neq(count, Ast.NumLiteral(1)), context.error(schema, 'oneOf')),
    );
  } else {
    return Ast.Empty;
  }
};

export default oneOf;
