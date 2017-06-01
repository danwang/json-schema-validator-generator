// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import type {JsonSchema} from 'generated-types.js';

const baseLiteral = (base: number | boolean | string): JsAst => {
  if (typeof base === 'number') {
    return Ast.NumLiteral(base);
  } else if (typeof base === 'boolean') {
    return base ? Ast.True : Ast.False;
  } else {
    return Ast.StringLiteral(base);
  }
};

const _enum = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.enum) {
    const match = context.gensym();
    const checks: Array<JsAst> = _.map(schema.enum, (value) => {
      if (typeof value !== 'object') {
        return Ast.If(
          Ast.Binop.Eq(symbol, baseLiteral(value)),
          Ast.Unop.Incr(match),
        );
      } else {
        return Ast.If(
          Ast.Binop.Eq(
            Ast.Call1('JSON.stringify', symbol),
            Ast.StringLiteral(JSON.stringify(value)),
          ),
          Ast.Unop.Incr(match),
        );
      }
    });
    return Ast.Body(
      Ast.Assignment(match, Ast.NumLiteral(0)),
      Ast.Body(...checks),
      Ast.If(Ast.Binop.Eq(match, Ast.NumLiteral(0)), context.error(schema, 'enum')),
    );
  } else {
    return Ast.Empty;
  }
};

export default _enum;
