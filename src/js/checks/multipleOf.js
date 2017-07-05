// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const _multipleOf = (
  schema: JsonSchema,
  symbol: VarType,
  context: Context
): JsAst => {
  const {multipleOf} = schema;
  if (multipleOf) {
    const divided = context.gensym();
    return M.TypeCheck(
      'number',
      symbol,
      Ast.Body(
        Ast.Assignment(
          divided,
          Ast.Binop.Div(symbol, Ast.NumLiteral(multipleOf))
        ),
        Ast.If(
          Ast.Unop.Not(M.PrimitivePredicate('integer', divided)),
          context.error(schema, 'multipleOf')
        )
      )
    );
  } else {
    return Ast.Empty;
  }
};

export default _multipleOf;
