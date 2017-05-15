// @flow
import Ast from 'js/ast/ast.js';
import transform from 'js/ast/transform.js';
import type {ErrorCode} from 'js/ast/get-errors';
import type {Transform} from 'js/ast/transform.js';
import type {JsAst} from 'js/ast/ast.js';

const replaceErrors = (
  root: JsAst,
  errors: Array<ErrorCode>,
  nameForSchema: (schema: JsonSchema) => string,
) => {
  let id = 1;
  const cache = {};
  const t = transform((ast: JsAst, recur: Transform): JsAst => {
    if (ast.type === 'error') {
      const {schema, reason} = ast;
      const message = `${nameForSchema(schema)}: ${reason}`;
      if (!cache.hasOwnProperty(message)) {
        cache[message] = id++;
      }
      return Ast.Return(Ast.NumLiteral(cache[message]));
    } else {
      return recur(ast);
    }
  });
  return t(root);
};

export default replaceErrors;
