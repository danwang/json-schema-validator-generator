// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst, ExprType, IfType, BodyType} from './ast.js';
import Ast from './ast.js';

const simplifyIf = (ast: IfType): JsAst => {
  const body = simplify(ast.body);
  const elseBody = simplify(ast.elseBody);
  if (body.type === 'empty' && elseBody.type === 'empty') {
    return Ast.Empty;
  } else {
    return Ast.If(
      simplifyExpr(ast.predicate),
      body,
      elseBody,
    );
  }
};

const simplifyBody = (ast: BodyType): JsAst => {
  const mapped = _.flatMap(ast.body, (child) => {
    const simplified = simplify(child);
    if (simplified.type === 'body') {
      return simplified.body;
    } else if (simplified.type === 'empty') {
      return [];
    } else {
      return [simplified];
    }
  });
  if (mapped.length === 0) {
    return Ast.Empty;
  } else {
    return Ast.Body(...mapped);
  }
};

const simplifyExpr = (ast: ExprType): ExprType => {
  switch (ast.type) {
    case 'function1':
      return Ast.Function1(ast.argument, simplify(ast.body), ast.name);
    case 'binop':
    case 'empty':
    case 'literal':
    default:
      return ast;
  }
};

const simplify = (ast: JsAst): JsAst => {
  switch (ast.type) {
    case 'assignment':
      return Ast.Assignment(ast.variable, simplifyExpr(ast.value));
    case 'if':
      return simplifyIf(ast);
    case 'return':
      return ast;
    case 'body':
      return simplifyBody(ast);
    case 'for':
    case 'forin':
    case 'empty':
      return ast;
    case 'function1':
      return simplifyExpr(ast);
    case 'binop':
    default:
      return ast;
  }
};

export default simplify;
