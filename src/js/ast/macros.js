// @flow
import type {Context} from 'js/generate.js';
import type {JsAst} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';

// Delegates a check to a different schema. If the schema errors, then also
// error. Otherwise, do nothing.
const Delegate = (
  subSchema: JsonSchema,
  symbol: JsAst,
  context: Context,
  body: JsAst,
): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return Ast.If(
    Ast.Binop.Neq(
      Ast.Call(fnSym, symbol),
      Ast.Null,
    ),
    body,
  );
};

export default {
  Delegate,
};
