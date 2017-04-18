// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {
  JsAst, IfType, ForType, ForInType, Function1Type, ObjectLiteralType,
} from 'jsvg/js/jsast/ast.js';
import getVars from 'jsvg/js/jsast/get-vars.js';
import util from 'jsvg/util.js';

const renderIf = (ast: IfType, depth: number) => {
  const {predicate, body, elseBody} = ast;

  const elseString = render(elseBody, depth + 1);
  const elseLines = elseString ? [
    util.indent('} else {', depth),
    elseString,
  ] : [];
  return [
    util.indent(`if (${render(predicate)}) {`, depth),
    render(body, depth + 1),
    ...elseLines,
    util.indent('}', depth),
  ].join('\n');
};

const renderFor = (ast: ForType, depth: number) => {
  const {init, condition, loop, body} = ast;
  return [
    util.indent(`for (${render(init)}; ${render(condition)}; ${render(loop)}) {`, depth),
    render(body, depth + 1),
    util.indent('}', depth),
  ].join('\n');
};

const renderForIn = (ast: ForInType, depth: number) => {
  const {variable, iterator, body} = ast;
  return [
    util.indent(`for (var ${render(variable)} in ${render(iterator)}) {`, depth),
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
    util.indent(`function ${render(name)}(${render(argument)}) {`, depth),
    ...varLines,
    render(body, depth + 1),
    util.indent('}', depth),
  ].join('\n');
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

const render = (ast: JsAst, depth: number = 0) => {
  switch (ast.type) {
    case 'assignment':
      return util.indent(`${render(ast.variable)} = ${render(ast.value)};`, depth);
    case 'if':
      return renderIf(ast, depth);
    case 'return':
      return util.indent(`return ${render(ast.value)};`, depth);
    case 'body':
      return _.map(ast.body, (s) => render(s, depth)).join('\n');
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
    case 'literal':
      return util.indent(ast.value, depth);
    case 'call':
      return util.indent(`${render(ast.fn)}(${render(ast.arg)})`, depth);
    case 'not':
      return util.indent(`!(${render(ast.child)})`, depth);
    case 'objectliteral':
      return renderObjectLiteral(ast, depth);
    default:
      throw new Error(`Unexpected AST: ${ast}`);
  }
};

export default render;
