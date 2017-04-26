// @flow
import type {Context} from 'js/generate.js';
import type {JsAst} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';

const FailedCheck = (subSchema: JsonSchema, symbol: JsAst, context: Context): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return Ast.Binop.Neq(
    Ast.Call(fnSym, symbol),
    Ast.Null,
  );
};

const PassedCheck = (subSchema: JsonSchema, symbol: JsAst, context: Context): JsAst => {
  const fnSym = context.symbolForSchema(subSchema);
  return Ast.Binop.Eq(
    Ast.Call(fnSym, symbol),
    Ast.Null,
  );
};

export default {
  FailedCheck,
  PassedCheck,
};
