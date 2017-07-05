// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {JsAst, IfType, BodyType, UnopType} from 'js/ast/ast.js';
import Ast from 'js/ast/ast.js';

const simplifyIf = (ast: IfType): JsAst => {
  const predicate = simplify(ast.predicate);
  const body = simplify(ast.body);
  const elseBody = simplify(ast.elseBody);
  if (elseBody.type === 'empty') {
    if (body.type === 'empty') {
      return Ast.Empty;
    } else if (body.type === 'body') {
      const [first, ...rest] = body.body;
      if (
        rest.length === 0 &&
        first.type === 'if' &&
        first.elseBody.type === 'empty'
      ) {
        return simplify(
          Ast.If(
            Ast.Binop.And(predicate, first.predicate),
            first.body,
            Ast.Empty
          )
        );
      } else {
        return Ast.If(predicate, body, elseBody);
      }
    } else {
      return Ast.If(predicate, body, elseBody);
    }
  } else {
    return Ast.If(predicate, body, elseBody);
  }
};

const simplifyBody = (ast: BodyType): JsAst => {
  const mapped = _.flatMap(ast.body, child => {
    const simplified = simplify(child);
    if (simplified.type === 'body') {
      return simplified.body;
    } else if (simplified.type === 'empty') {
      return [];
    } else {
      return [simplified];
    }
  });

  const firstReturn = _.findIndex(mapped, node => node.type === 'return');
  const body = firstReturn >= 0 ? mapped.slice(0, firstReturn + 1) : mapped;
  if (body.length === 0) {
    return Ast.Empty;
  } else {
    return Ast.Body(...body);
  }
};

const simplifyUnop = (ast: UnopType): JsAst => {
  const {child} = ast;
  if (ast.op === '!') {
    if (child.type === 'binop') {
      const left = simplify(child.left);
      const right = simplify(child.right);
      switch (child.comparator) {
        case '===':
          return Ast.Binop.Neq(left, right);
        case '!==':
          return Ast.Binop.Eq(left, right);
        case '&&':
          return Ast.Binop.Or(
            simplify(Ast.Unop.Not(left)),
            simplify(Ast.Unop.Not(right))
          );
        case '||':
          return Ast.Binop.And(
            simplify(Ast.Unop.Not(left)),
            simplify(Ast.Unop.Not(right))
          );
        case '<':
          return Ast.Binop.Gte(left, right);
        case '>':
          return Ast.Binop.Lte(left, right);
        case '<=':
          return Ast.Binop.Gt(left, right);
        case '>=':
          return Ast.Binop.Lt(left, right);
        default:
          return ast;
      }
    } else if (child.type === 'unop' && child.op === '!') {
      return child.child;
    } else {
      return ast;
    }
  } else {
    return ast;
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
      return Ast.For(
        simplify(ast.init),
        simplify(ast.condition),
        simplify(ast.loop),
        simplify(ast.body)
      );
    case 'forin':
      return Ast.ForIn(
        ast.variable,
        simplify(ast.iterator),
        simplify(ast.body)
      );
    case 'empty':
      return ast;
    case 'function1':
      return Ast.Function1(ast.name, ast.argument, simplify(ast.body));
    case 'binop':
      return Ast.Binop.Any(ast.comparator)(
        simplify(ast.left),
        simplify(ast.right)
      );
    case 'unop':
      return simplifyUnop(ast);
    default:
      return ast;
  }
};

export default simplify;
