// @flow
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const multipleOf = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.multipleOf) {
    const divided = context.gensym();
    return util.typeCheck('number', symbol, Ast.Body(
      Ast.Assignment(divided, Ast.Literal(`${symbol} / ${schema.multipleOf}`)),
      Ast.If(
        Ast.Not(util.primitivePredicate('integer', divided)),
        context.error(),
      ),
    ));
  } else {
    return Ast.Empty;
  }
};

export default multipleOf;
