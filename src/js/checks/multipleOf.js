// @flow
import util from 'util.js';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

const _multipleOf = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const {multipleOf} = schema;
  if (multipleOf) {
    const divided = context.gensym();
    return util.typeCheck('number', symbol, Ast.Body(
      Ast.Assignment(divided, Ast.Binop.Div(symbol, Ast.NumLiteral(multipleOf))),
      Ast.If(
        Ast.Unop.Not(util.primitivePredicate('integer', divided)),
        context.error(schema, 'multipleOf'),
      ),
    ));
  } else {
    return Ast.Empty;
  }
};

export default _multipleOf;
