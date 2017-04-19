// @flow
import type {JsAst, VarType} from 'js/jsast/ast.js';

export type Context = {
  gensym: () => VarType,
  error: () => JsAst,
  symbolForSchema: (schema: JsonSchema) => VarType,
  rootSchema: JsonSchema,
};
