// @flow
import _ from 'lodash';
import type {Context} from '../types.js';
import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const oneOf = (schema: Object, symbol: string, context: Context): JsAst => {
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
      return Ast.If(Ast.Binop.Eq(Ast.Call(fnSym, symbol), 'null'), `${count}++`);
    });
    return Ast.Body(
      Ast.Assignment(count, '0'),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Neq(count, '1'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default oneOf;
