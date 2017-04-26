// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const not = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.not) {
    return Ast.If(
      M.PassedCheck(schema.not, symbol, context),
      context.error(schema, 'not'),
    );
  } else {
    return Ast.Empty;
  }
};

export default not;
