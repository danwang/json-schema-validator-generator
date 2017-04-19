// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst} from 'js/jsast/ast.js';

export type Collect<T> = (ast: JsAst) => Array<T>;
const collect = <T>(extractor: (ast: JsAst, recur: Collect<T>) => Array<T>): Collect<T> => {
  const _recur = (ast: JsAst): Array<T> => {
    switch (ast.type) {
      case 'assignment':
        return recur(ast.value);
      case 'if':
        return [
          ...recur(ast.predicate),
          ...recur(ast.body),
          ...recur(ast.elseBody),
        ];
      case 'return':
        return recur(ast.value);
      case 'body':
        return _.flatMap(ast.body, recur);
      case 'for':
        return [
          ...recur(ast.init),
          ...recur(ast.condition),
          ...recur(ast.loop),
          ...recur(ast.body),
        ];
      case 'forin':
        return [
          ...recur(ast.iterator),
          ...recur(ast.body),
        ];
      case 'empty':
        return [];
      case 'function1':
        return [
          ...recur(ast.name),
          ...recur(ast.argument),
          ...recur(ast.body),
        ];
      case 'binop':
        return [
          ...recur(ast.left),
          ...recur(ast.right),
        ];
      case 'literal':
        return [];
      case 'call':
        return [
          ...recur(ast.fn),
          ...recur(ast.arg),
        ];
      case 'unop':
        return recur(ast.child);
      case 'objectliteral':
        return _.flatMap(ast.object, recur);
      default:
        throw new Error(`Unexpected AST: ${ast}`);
    }
  };
  const recur = (ast: JsAst): Array<T> => {
    return extractor(ast, _recur);
  };
  return recur;
};

export default collect;
