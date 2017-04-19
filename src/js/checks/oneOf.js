// @flow
import _ from 'lodash';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const oneOf = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  if (schema.oneOf) {
    // var count = 0;
    //
    // if (check1(data) === null) { count++ }
    // if (check2(data) === null) { count++ }
    //
    // if (count !== 1) { (error) }
    const count = context.gensym();
    const checks = _.map(schema.oneOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(Ast.Binop.Eq(Ast.Call(fnSym, symbol), Ast.Null), Ast.Unop.Incr(count));
    });
    return Ast.Body(
      Ast.Assignment(count, Ast.Literal('0')),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Neq(count, '1'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default oneOf;
