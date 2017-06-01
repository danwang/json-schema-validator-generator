// @flow
import Ast from 'js/ast/ast.js';
import transform from 'js/ast/transform.js';
import type {ErrorCode} from 'js/ast/get-errors';
import type {Transform} from 'js/ast/transform.js';
import type {JsAst} from 'js/ast/ast.js';
import type {JsonSchema} from 'generated-types.js';

const replaceErrors = (
  root: JsAst,
  errors: Array<ErrorCode>,
  nameForSchema: (schema: JsonSchema) => string,
) => {
  let id = 1;
  const cache = {};
  const t = transform((ast: JsAst, recur: Transform): JsAst => {
    if (ast.type === 'error') {
      const {schema, reason, subreason} = ast;
      const message = `${nameForSchema(schema)}: ${reason}`;
      if (!cache.hasOwnProperty(message)) {
        cache[message] = id++;
      }
      if (subreason) {
        return Ast.Body(
          Ast.Comment(message),
          Ast.Return(Ast.Call(
            Ast.PropertyAccess(subreason, 'concat'),
            Ast.NumLiteral(cache[message]),
          )),
        );
      } else {
        // Lazy!
        return Ast.Body(
          Ast.Comment(message),
          Ast.Return(
            Ast.BracketAccess(Ast.Empty, Ast.NumLiteral(cache[message])),
          ),
        );
      }
    } else {
      return recur(ast);
    }
  });
  return t(root);
};

export default replaceErrors;
