// @flow
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const uniqueItems = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.uniqueItems) {
    const obj = context.gensym();
    const i = context.gensym();
    const stringified = context.gensym();
    return M.TypeCheck('array', symbol, Ast.Body(
      Ast.Assignment(obj, Ast.Literal('{}')),
      Ast.Assignment(i, Ast.NumLiteral(0)),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(i, Ast.PropertyAccess(symbol, 'length')),
        Ast.Unop.Incr(i),
        Ast.Body(
          Ast.Assignment(
            stringified,
            Ast.Call('JSON.stringify', Ast.BracketAccess(symbol, i)),
          ),
          Ast.Assignment(
            Ast.BracketAccess(obj, stringified),
            Ast.True,
          ),
        ),
      ),
      Ast.If(
        Ast.Binop.Neq(
          Ast.PropertyAccess(Ast.Call('Object.keys', obj), 'length'),
          Ast.PropertyAccess(symbol, 'length'),
        ),
        context.error(schema, 'uniqueItems'),
      ),
    ));
  } else {
    return Ast.Empty;
  }
};

export default uniqueItems;
