// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const _pattern = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const {pattern} = schema;
  if (pattern) {
    const check = Ast.If(
      Ast.Unop.Not(Ast.Call1(
        Ast.PropertyAccess(symbol, 'match'),
        Ast.Literal(`/${pattern}/`),
      )),
      context.error(schema, 'pattern'),
    );
    return M.TypeCheck('string', symbol, check);
  } else {
    return Ast.Empty;
  }
};

export default _pattern;
