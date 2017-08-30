// @flow
import jsonpointer from 'json-pointer';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import type {JsonSchema} from 'generated-types.js';

const ref = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  // No ref in json schema json schema...
  const {$ref} = (schema: any);
  if ($ref && typeof $ref === 'string' && $ref.startsWith('#')) {
    const subSchema = jsonpointer.get(
      context.rootSchema,
      decodeURIComponent($ref.substring(1))
    );
    const fnSym = context.symbolForSchema(subSchema);
    return Ast.Return(Ast.Call1(fnSym, symbol));
  } else {
    return Ast.Empty;
  }
};

export default ref;
