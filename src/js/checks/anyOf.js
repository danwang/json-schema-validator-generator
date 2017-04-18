// @flow
import _ from 'lodash';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const anyOf = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.anyOf) {
    // var count = 0;
    // check1(schema) === null && count++;
    // check2(schema) === null && count++;
    // if (count === 0) { (error) }
    const count = context.gensym();

    const checks: Array<JsAst> = _.map(schema.anyOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.Binop.And(
        Ast.Binop.Eq(Ast.Call(fnSym, symbol), 'null'),
        `${count}++`,
      );
    });
    return Ast.Body(
      Ast.Assignment(count, Ast.Literal('0')),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Eq(count, '0'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default anyOf;
