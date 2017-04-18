// @flow
import type {JsAst} from 'jsvg/js/jsast/ast.js';

export type Context = {
  gensym: () => string,
  error: () => JsAst,
  symbolForSchema: (schema: Object) => string,
  rootSchema: Object,
};
