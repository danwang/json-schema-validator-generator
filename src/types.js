// @flow
import type {JsAst} from 'js/jsast/ast.js';

export type Context = {
  gensym: () => string,
  error: () => JsAst,
  symbolForSchema: (schema: Object) => string,
  rootSchema: Object,
};
