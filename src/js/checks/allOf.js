// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const allOf = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.allOf) {
    const nodes = _.map(schema.allOf, (subSchema) => {
      return M.Delegate(subSchema, symbol, context, context.error(schema, 'allOf'));
    });
    return Ast.Body(...nodes);
  } else {
    return Ast.Empty;
  }
};

export default allOf;
