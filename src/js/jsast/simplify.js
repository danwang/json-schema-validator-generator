// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst, IfType, BodyType} from 'js/jsast/ast.js';
import Ast from 'js/jsast/ast.js';

const simplifyIf = (ast: IfType): JsAst => {
  const body = simplify(ast.body);
  const elseBody = simplify(ast.elseBody);
  if (body.type === 'empty' && elseBody.type === 'empty') {
    return Ast.Empty;
  } else {
    return Ast.If(
      simplify(ast.predicate),
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

  const firstReturn = _.findIndex(mapped, (node) => node.type === 'return');
  const body = firstReturn >= 0 ? mapped.slice(0, firstReturn + 1) : mapped;
  if (body.length === 0) {
    return Ast.Empty;
  } else if (body.length === 1) {
    return body[0];
  } else {
    return Ast.Body(...body);
  }
};

const simplify = (ast: JsAst): JsAst => {
  switch (ast.type) {
    case 'assignment':
      return Ast.Assignment(ast.variable, simplify(ast.value));
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
      return Ast.Function1(ast.name, ast.argument, simplify(ast.body));
    case 'binop':
    default:
      return ast;
  }
};

export default simplify;
