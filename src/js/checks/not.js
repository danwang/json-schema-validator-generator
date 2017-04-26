// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

const not = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.not) {
    const fnSym = context.symbolForSchema(schema.not);
    const result = context.gensym();

    return Ast.Body(
      Ast.Assignment(result, Ast.Call(fnSym, symbol)),
      Ast.If(Ast.Binop.Eq(result, Ast.Null), context.error(schema, 'not')),
    );
  } else {
    return Ast.Empty;
  }
};

export default not;
