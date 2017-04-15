// @flow
import _ from 'lodash';
import type {Context} from '../types.js';
import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const allOf = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.allOf) {
    const nodes = _.flatMap(schema.allOf, (subSchema) => {
      const fnSym = context.symbolForSchema(subSchema);
      const result = context.gensym();
      return Ast.Body(
        Ast.Assignment(result, `${fnSym}(${symbol})`),
        Ast.If(
          Ast.Binop.Neq(result, 'null'),
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
