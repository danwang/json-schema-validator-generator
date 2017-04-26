// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const required = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (Array.isArray(schema.required)) {
    const checks: Array<JsAst> = _.map(schema.required, (property) => {
      return Ast.If(
        Ast.Binop.Eq(Ast.PropertyAccess(symbol, property), Ast.Undefined),
        context.error(schema, `required[${property}]`),
      );
    });
    return M.TypeCheck('object', symbol, Ast.Body(...checks));
  } else {
    return Ast.Empty;
  }
};

export default required;
