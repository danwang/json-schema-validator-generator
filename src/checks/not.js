// @flow
import type {Context} from '../types.js';
import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const not = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.not) {
    const fnSym = context.symbolForSchema(schema.not);
    const result = context.gensym();

    return Ast.Body(
      Ast.Assignment(result, `${fnSym}(${symbol})`),
      Ast.If(Ast.Binop.Eq(result, 'null'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default not;
