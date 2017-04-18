// @flow
import type {Context} from 'jsvg/types.js';
import Ast from 'jsvg/jsast/ast.js';
import type {JsAst} from 'jsvg/jsast/ast.js';

const not = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.not) {
    const fnSym = context.symbolForSchema(schema.not);
    const result = context.gensym();

    return Ast.Body(
      Ast.Assignment(result, Ast.Call(fnSym, symbol)),
      Ast.If(Ast.Binop.Eq(result, 'null'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default not;
