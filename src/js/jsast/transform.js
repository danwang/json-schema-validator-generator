// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst} from 'jsvg/js/jsast/ast.js';
import Ast from 'jsvg/js/jsast/ast.js';

export type Transform = (ast: JsAst) => JsAst;
const transform = (partial: (ast: JsAst, recur: Transform) => JsAst) => {
  const _recur: Transform = (ast) => {
    switch (ast.type) {
      case 'assignment':
        // $FlowFixMe
        return Ast.Assignment(recur(ast.variable), recur(ast.value));
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
          // $FlowFixMe
          recur(ast.variable),
          recur(ast.iterator),
          recur(ast.body),
        );
      case 'empty':
        return Ast.Empty;
      case 'function1':
        return Ast.Function1(
          // $FlowFixMe
          recur(ast.name),
          // $FlowFixMe
          recur(ast.argument),
          recur(ast.body),
        );
      case 'binop':
        return Ast.Binop.Any(ast.comparator)(recur(ast.left), recur(ast.right));
      case 'literal':
        return ast;
      case 'call':
        // $FlowFixMe
        return Ast.Call(recur(ast.fn), recur(ast.arg));
      case 'not':
        return Ast.Not(recur(ast.child));
      case 'objectliteral':
        return Ast.ObjectLiteral(_.mapValues(ast.object, recur));
      default:
        throw new Error(`Unexpected AST: ${ast}`);
    }
  };
  const recur: Transform = (ast) => partial(ast, _recur);
  return recur;
};

export default transform;
