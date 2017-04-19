// @flow
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst, VarType} from 'js/jsast/ast.js';

const not = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.not) {
    const fnSym = context.symbolForSchema(schema.not);
    const result = context.gensym();

    return Ast.Body(
      Ast.Assignment(result, Ast.Call(fnSym, symbol)),
      Ast.If(Ast.Binop.Eq(result, Ast.Null), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default not;
