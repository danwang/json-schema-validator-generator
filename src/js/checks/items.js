// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const _additionalItems = (
  schema: JsonSchema,
  items: Array<JsonSchema>,
  symbol: VarType,
  context: Context
): JsAst => {
  const {additionalItems} = schema;
  const error = context.error(schema, 'additionalItems');
  if (additionalItems === false) {
    return Ast.If(
      Ast.Binop.Gt(
        Ast.PropertyAccess(symbol, 'length'),
        Ast.NumLiteral(items.length)
      ),
      error
    );
  } else if (additionalItems && typeof additionalItems === 'object') {
    const i = context.gensym();
    return Ast.Body(
      Ast.Assignment(i, Ast.NumLiteral(items.length)),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(i, Ast.PropertyAccess(symbol, 'length')),
        Ast.Unop.Incr(i),
        Ast.If(
          M.FailedCheck(additionalItems, Ast.BracketAccess(symbol, i), context),
          error
        )
      )
    );
  } else {
    return Ast.Empty;
  }
};

const _items = (
  schema: JsonSchema,
  symbol: VarType,
  context: Context
): JsAst => {
  const {items} = schema;
  if (Array.isArray(items)) {
    // Tuple. Handle each item individually.
    const additionalCheck = _additionalItems(schema, items, symbol, context);
    const checks = _.map(items, (subSchema, i: number) => {
      return Ast.If(
        Ast.Binop.Lt(Ast.NumLiteral(i), Ast.PropertyAccess(symbol, 'length')),
        Ast.If(
          M.FailedCheck(
            subSchema,
            Ast.BracketAccess(symbol, Ast.NumLiteral(i)),
            context
          ),
          context.error(schema, `items[${i}]`)
        )
      );
    });
    return Ast.Body(additionalCheck, ...checks);
  } else if (items) {
    const counter = context.gensym();
    const check = Ast.Body(
      Ast.Assignment(counter, Ast.NumLiteral(0)),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(counter, Ast.PropertyAccess(symbol, 'length')),
        Ast.Unop.Incr(counter),
        Ast.If(
          M.FailedCheck(items, Ast.BracketAccess(symbol, counter), context),
          context.error(schema, 'items')
        )
      )
    );
    return M.TypeCheck('array', symbol, check);
  } else {
    return Ast.Empty;
  }
};

export default _items;
