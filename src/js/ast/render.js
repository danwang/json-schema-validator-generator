// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {
  JsAst, IfType, ForType, ForInType, Function1Type, UnopType, ObjectLiteralType,
} from 'js/ast/ast.js';
import getVars from 'js/ast/get-vars.js';
import util from 'util.js';

const renderIf = (ast: IfType, depth: number) => {
  const {predicate, body, elseBody} = ast;

  const elseString = render(elseBody, depth + 1);
  const elseLines = elseString ? [
    util.indent('} else {', depth),
    elseString,
  ] : [];
  return [
    `if (${render(predicate)}) {`,
    render(body, depth + 1),
    ...elseLines,
    util.indent('}', depth),
  ].join('\n');
};

const renderFor = (ast: ForType, depth: number) => {
  const {init, condition, loop, body} = ast;
  return [
    `for (${render(init)}; ${render(condition)}; ${render(loop)}) {`,
    render(body, depth + 1),
    util.indent('}', depth),
  ].join('\n');
};

const renderForIn = (ast: ForInType, depth: number) => {
  const {variable, iterator, body} = ast;
  return [
    `for (var ${render(variable)} in ${render(iterator)}) {`,
    render(body, depth + 1),
    util.indent('}', depth),
  ].join('\n');
};

const renderFunction = (ast: Function1Type, depth: number) => {
  const {name, argument, body} = ast;
  const vars = getVars(body);
  const varLines = vars.length === 0 ? [] : [
    util.indent(`var ${vars.join(', ')};`, depth + 1),
  ];
  return [
    `function ${render(name)}(${render(argument)}) {`,
    ...varLines,
    render(body, depth + 1),
    util.indent('}', depth),
  ].join('\n');
};

const renderUnop = (ast: UnopType, depth: number) => {
  const child = `(${render(ast.child)})`;
  if (ast.style === 'prefix') {
    return `${ast.op}${child}`;
  } else {
    return `${child}${ast.op}`;
  }
};

const renderObjectLiteral = (ast: ObjectLiteralType, depth: number) => {
  const {object} = ast;
  const lines = _.map(object, (value, key) => {
    const valueString = render(value, depth + 1);
    return util.indent(`${key}: ${valueString.trimLeft()},`, depth + 1);
  });
  return [
    util.indent('{', depth),
    ...lines,
    util.indent('}', depth),
  ].join('\n');
};

const STATEMENTS_WITH_SEMIS = ['assignment', 'return', 'binop', 'call', 'unop'];

const render = (ast: JsAst, depth: number = 0) => {
  switch (ast.type) {
    case 'assignment':
      return `${render(ast.variable)} = ${render(ast.value)}`;
    case 'if':
      return renderIf(ast, depth);
    case 'return':
      return `return ${render(ast.value, depth).trimLeft()}`;
    case 'body':
      return _.map(ast.body, (s) => {
        const suffix = _.includes(STATEMENTS_WITH_SEMIS, s.type) ? ';' : '';
        const line = util.indent(render(s, depth), depth);
        return `${line}${suffix}`;
      }).join('\n');
    case 'for':
      return renderFor(ast, depth);
    case 'forin':
      return renderForIn(ast, depth);
    case 'empty':
      return '';
    case 'function1':
      return renderFunction(ast, depth);
    case 'binop':
      return `${render(ast.left, depth)} ${ast.comparator} ${render(ast.right, depth)}`;
    case 'var':
      return ast.value;
    case 'literal':
      return ast.value;
    case 'call':
      return `${render(ast.fn)}(${render(ast.arg)})`;
    case 'unop':
      return renderUnop(ast, depth);
    case 'objectliteral':
      return renderObjectLiteral(ast, depth);
    case 'propertyaccess':
      return `${render(ast.obj, depth)}.${ast.property}`;
    case 'bracketaccess':
      return `${render(ast.obj, depth)}[${render(ast.property, depth)}]`;
    case 'typeof':
      return `typeof ${render(ast.child, depth)}`;
    default:
      throw new Error(`Unexpected AST: ${ast}`);
  }
};

export default render;
