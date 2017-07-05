// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';

export type Transform = (ast: JsAst) => JsAst;
const transform = (partial: (ast: JsAst, recur: Transform) => JsAst) => {
  const _recur: Transform = ast => {
    switch (ast.type) {
      case 'assignment':
        return Ast.Assignment(recur(ast.variable), recur(ast.value));
      case 'if':
        return Ast.If(
          recur(ast.predicate),
          recur(ast.body),
          recur(ast.elseBody)
        );
      case 'return':
        return Ast.Return(recur(ast.value));
      case 'body':
        return Ast.Body(..._.map(ast.body, recur));
      case 'for':
        return Ast.For(
          recur(ast.init),
          recur(ast.condition),
          recur(ast.loop),
          recur(ast.body)
        );
      case 'forin':
        return Ast.ForIn(
          (recur(ast.variable): any),
          recur(ast.iterator),
          recur(ast.body)
        );
      case 'empty':
        return Ast.Empty;
      case 'function1':
        return Ast.Function1(
          (recur(ast.name): any),
          (recur(ast.argument): any),
          recur(ast.body)
        );
      case 'binop':
        return Ast.Binop.Any(ast.comparator)(recur(ast.left), recur(ast.right));
      case 'var':
        return ast;
      case 'literal':
        return ast;
      case 'call0':
        return Ast.Call0(recur(ast.fn));
      case 'call1':
        return Ast.Call1(recur(ast.fn), recur(ast.arg));
      case 'call2':
        return Ast.Call2(recur(ast.fn), recur(ast.arg1), recur(ast.arg2));
      case 'unop':
        return Ast.Unop.Any(ast.op, ast.style)(recur(ast.child));
      case 'objectliteral':
        return Ast.ObjectLiteral(_.mapValues(ast.object, recur));
      case 'propertyaccess':
        return Ast.PropertyAccess(recur(ast.obj), ast.property);
      case 'bracketaccess':
        return Ast.BracketAccess(recur(ast.obj), recur(ast.property));
      case 'typeof':
        return Ast.TypeOf(recur(ast.child));
      case 'comment':
        return ast;
      case 'error':
        return ast;
      default:
        throw new Error(`Unexpected AST: ${ast}`);
    }
  };
  const recur: Transform = ast => partial(ast, _recur);
  return recur;
};

export default transform;
