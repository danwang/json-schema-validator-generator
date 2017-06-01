// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';
import type {JsonSchema} from 'generated-types.js';

const allOf = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.allOf) {
    const checkResult = context.gensym();
    const nodes = _.map(schema.allOf, (subSchema) => {
      return Ast.Body(
        Ast.Assignment(checkResult, M.Check(subSchema, symbol, context)),
        Ast.If(
          M.IsError(checkResult),
          context.error(schema, 'allOf', checkResult),
        ),
      );
    });
    return Ast.Body(...nodes);
  } else {
    return Ast.Empty;
  }
};

export default allOf;
