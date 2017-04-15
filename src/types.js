// @flow
import type {JsAst} from './jsast/ast.js';

export type Context = {
  gengensym: () => () => string,
  gensym: () => string,
  error: () => JsAst,
  symbolForSchema: (schema: Object) => string,
};
