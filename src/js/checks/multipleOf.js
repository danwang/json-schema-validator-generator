// @flow
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const _multipleOf = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  const {multipleOf} = schema;
  if (multipleOf) {
    const divided = context.gensym();
    return util.typeCheck('number', symbol, Ast.Body(
      Ast.Assignment(divided, Ast.Binop.Div(symbol, Ast.Literal(`${multipleOf}`))),
      Ast.If(
        Ast.Unop.Not(util.primitivePredicate('integer', divided)),
        context.error(),
      ),
    ));
  } else {
    return Ast.Empty;
  }
};

export default _multipleOf;
