// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst, VarType} from 'js/jsast/ast.js';

const _additionalItems = (schema: JsonSchema, items: Array<JsonSchema>, symbol: VarType, context: Context): JsAst => {
  const {additionalItems} = schema;
  if (additionalItems === false) {
    return Ast.If(
      Ast.Binop.Gt(
        Ast.PropertyAccess(symbol, 'length'),
        Ast.NumLiteral(items.length),
      ),
      context.error(),
    );
  } else if (additionalItems && typeof additionalItems === 'object') {
    const fnSym = context.symbolForSchema(additionalItems);
    const i = context.gensym();
    return Ast.Body(
      Ast.Assignment(i, Ast.NumLiteral(items.length)),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(i, Ast.PropertyAccess(symbol, 'length')),
        Ast.Unop.Incr(i),
        Ast.Body(
          Ast.If(
            Ast.Binop.Neq(Ast.Call(fnSym, Ast.BracketAccess(symbol, i)), Ast.Null),
            context.error(),
          ),
        ),
      ),
    );
  } else {
    return Ast.Empty;
  }
};

const items = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (Array.isArray(schema.items)) {
    // Tuple. Handle each item individually.
    const additionalCheck = _additionalItems(schema, schema.items, symbol, context);
    const checks = _.map(schema.items, (subSchema, i) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        Ast.Binop.And(
          Ast.Binop.Lt(Ast.NumLiteral(i), Ast.PropertyAccess(symbol, 'length')),
          Ast.Binop.Neq(
            Ast.Call(fnSym, Ast.BracketAccess(symbol, Ast.NumLiteral(i))),
            Ast.Null,
          ),
        ),
        context.error(),
      );
    });
    return Ast.Body(additionalCheck, ...checks);
  } else if (schema.items) {
    const fnSym = context.symbolForSchema(schema.items);
    const counter = context.gensym();
    const result = context.gensym();
    const check = Ast.Body(
      Ast.Assignment(counter, Ast.NumLiteral(0)),
      Ast.Assignment(result, Ast.Null),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(counter, Ast.PropertyAccess(symbol, 'length')),
        Ast.Unop.Incr(counter),
        Ast.Body(
          Ast.Assignment(result, Ast.Call(fnSym, Ast.BracketAccess(symbol, counter))),
          Ast.If(Ast.Binop.Neq(result, Ast.Null), Ast.Return(result)),
        ),
      ),
    );
    return util.typeCheck('array', symbol, check);
  } else {
    return Ast.Empty;
  }
};

export default items;
