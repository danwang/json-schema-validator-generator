// @flow
import type {JsAst} from 'js/ast/ast.js';
import collect from 'js/ast/collect.js';
import type {Collect} from 'js/ast/collect.js';
import type {JsonSchema} from 'generated-types.js';

export type ErrorCode = {
  schema: JsonSchema,
  reason: string,
};
const getErrors = (root: JsAst): Array<ErrorCode> => {
  const _getErrors = collect((ast: JsAst, recur: Collect<ErrorCode>) => {
    if (ast.type === 'error') {
      const {schema, reason} = ast;
      return [{schema, reason}];
    } else {
      return recur(ast);
    }
  });
  return _getErrors(root);
};

export default getErrors;
