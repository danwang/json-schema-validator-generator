// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

const allOf = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.allOf) {
    const nodes = _.flatMap(schema.allOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      const result = context.gensym();
      return Ast.Body(
        Ast.Assignment(result, Ast.Call(fnSym, symbol)),
        Ast.If(
          Ast.Binop.Neq(result, Ast.Null),
          context.error(),
        ),
      );
    });
    return Ast.Body(...nodes);
  } else {
    return Ast.Empty;
  }
};

export default allOf;
