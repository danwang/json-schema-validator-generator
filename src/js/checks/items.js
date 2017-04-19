// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const additionalItems = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.additionalItems === false) {
    return Ast.If(
      Ast.Binop.Gt(`${symbol}.length`, `${schema.items.length}`),
      context.error(),
    );
  } else if (schema.additionalItems !== undefined) {
    const fnSym = context.symbolForSchema(schema.additionalItems);
    const i = context.gensym();
    return Ast.Body(
      Ast.Assignment(i, Ast.Literal(`${schema.items.length}`)),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(i, `${symbol}.length`),
        Ast.Literal(`${i}++`),
        Ast.Body(
          Ast.If(
            Ast.Binop.Neq(Ast.Call(fnSym, `${symbol}[${i}]`), 'null'),
            context.error(),
          ),
        ),
      ),
    );
  } else {
    return Ast.Empty;
  }
};

const items = (schema: Object, symbol: string, context: Context): JsAst => {
  if (Array.isArray(schema.items)) {
    // Tuple. Handle each item individually.
    const additionalCheck = additionalItems(schema, symbol, context);
    const checks = _.map(schema.items, (subSchema, i) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        Ast.Binop.And(
          Ast.Binop.Lt(`${i}`, `${symbol}.length`),
          Ast.Binop.Neq(Ast.Call(fnSym, `${symbol}[${i}]`), 'null'),
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
      Ast.Assignment(counter, Ast.Literal('0')),
      Ast.Assignment(result, Ast.Literal('null')),
      Ast.For(
        Ast.Empty,
        Ast.Binop.Lt(counter, `${symbol}.length`),
        Ast.Literal(`${counter}++`),
        Ast.Body(
          Ast.Assignment(result, Ast.Call(fnSym, `${symbol}[${counter}]`)),
          Ast.If(Ast.Binop.Neq(result, 'null'), Ast.Return(result)),
        ),
      ),
    );
    return util.typeCheck('array', symbol, check);
  } else {
    return Ast.Empty;
  }
};

export default items;
