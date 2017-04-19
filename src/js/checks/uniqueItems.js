// @flow
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';
import util from 'util.js';

const uniqueItems = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  if (schema.uniqueItems) {
    const obj = context.gensym();
    const i = context.gensym();
    const stringified = context.gensym();
    return util.typeCheck('array', symbol, Ast.Body(
      Ast.Assignment(obj, Ast.Literal('{}')),
      Ast.Assignment(i, Ast.Literal('0')),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(i, `${symbol}.length`),
        Ast.Literal(`${i}++`),
        Ast.Body(
          Ast.Assignment(stringified, Ast.Call('JSON.stringify', `${symbol}[${i}]`)),
          // TODO: Fix this because it's broken
          Ast.Literal(`${obj}[${stringified}] = true;`),
        ),
      ),
      Ast.If(
        Ast.Binop.Neq(`Object.keys(${obj}).length`, `${symbol}.length`),
        context.error(),
      ),
    ));
  } else {
    return Ast.Empty;
  }
};

export default uniqueItems;
