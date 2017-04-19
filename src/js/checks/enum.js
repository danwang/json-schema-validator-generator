// @flow
import _ from 'lodash';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const _enum = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  if (schema.enum) {
    const match = context.gensym();
    const checks: Array<JsAst> = _.map(schema.enum, (value) => {
      if (typeof value === 'number' || typeof value === 'boolean') {
        return Ast.If(Ast.Binop.Eq(symbol, _.toString(value)), `${match}++`);
      } else if (typeof value === 'string') {
        return Ast.If(Ast.Binop.Eq(symbol, `"${value}"`), `${match}++`);
      } else {
        return Ast.If(
          Ast.Binop.Eq(`JSON.stringify(${symbol})`, `'${JSON.stringify(value)}'`),
          `${match}++`,
        );
      }
    });
    return Ast.Body(
      Ast.Assignment(match, Ast.Literal('0')),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Eq(match, '0'), context.error()),
    );
  } else {
    return Ast.Empty;
  }
};

export default _enum;
