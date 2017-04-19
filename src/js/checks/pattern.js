// @flow
import util from 'util.js';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';

const pattern = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  if (schema.pattern) {
    const check = Ast.If(
      `!${symbol}.match(/${schema.pattern}/)`,
      context.error(),
    );
    return util.typeCheck('string', symbol, check);
  } else {
    return Ast.Empty;
  }
};

export default pattern;
