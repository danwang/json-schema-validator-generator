// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const anyOf = (
  schema: JsonSchema,
  symbol: VarType,
  context: Context
): JsAst => {
  if (schema.anyOf) {
    // var count = 0;
    // check1(schema) === null && count++;
    // check2(schema) === null && count++;
    // if (count === 0) { (error) }
    const count = context.gensym();

    const checks: Array<JsAst> = _.map(schema.anyOf, subSchema => {
      return Ast.Binop.And(
        M.PassedCheck(subSchema, symbol, context),
        Ast.Unop.Incr(count)
      );
    });
    return Ast.Body(
      Ast.Assignment(count, Ast.NumLiteral(0)),
      Ast.Body(...checks),
      Ast.If(
        Ast.Binop.Eq(count, Ast.NumLiteral(0)),
        context.error(schema, 'anyOf')
      )
    );
  } else {
    return Ast.Empty;
  }
};

export default anyOf;
