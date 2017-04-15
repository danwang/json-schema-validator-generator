// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst} from './ast.js';
import Ast from './ast.js';

const transform = (partial: (ast: JsAst) => ?JsAst) => {
  const _recur = (ast: JsAst): JsAst => {
    switch (ast.type) {
      case 'assignment':
        return Ast.Assignment(ast.variable, recur(ast.value));
      case 'if':
        return Ast.If(recur(ast.predicate), recur(ast.body), recur(ast.elseBody));
      case 'return':
        return Ast.Return(recur(ast.value));
      case 'body':
        return Ast.Body(..._.map(ast.body, recur));
      case 'for':
        return Ast.For(
          recur(ast.init),
          recur(ast.condition),
          recur(ast.loop),
          recur(ast.body),
        );
      case 'forin':
        return Ast.ForIn(
          ast.variable,
          recur(ast.iterator),
          recur(ast.body),
        );
      case 'empty':
        return Ast.Empty;
      case 'function1':
        return Ast.Function1(
          ast.argument,
          recur(ast.body),
          ast.name,
        );
      case 'binop':
        return Ast.Binop.Any(ast.comparator)(recur(ast.left), recur(ast.right));
      case 'literal':
      case 'call':
        return ast;
      case 'not':
        return Ast.Not(recur(ast.child));
      default:
        throw new Error(`Unexpected AST: ${ast}`);
    }
  };
  const recur = (ast: JsAst): JsAst => {
    const recurred = _recur(ast);
    return partial(recurred) || recurred;
  };
  return recur;
};

export default transform;
