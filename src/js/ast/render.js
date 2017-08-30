// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {
  JsAst,
  IfType,
  ForType,
  ForInType,
  Function1Type,
  UnopType,
  ObjectLiteralType,
} from 'js/ast/ast.js';
import getVars from 'js/ast/get-vars.js';

const renderIf = (ast: IfType) => {
  const {predicate, body, elseBody} = ast;

  const elseString = render(elseBody);
  const elseLines = elseString ? ['} else {', elseString] : [];
  return [`if (${render(predicate)}) {`, render(body), ...elseLines, '}'].join(
    '\n'
  );
};

const renderFor = (ast: ForType) => {
  const {init, condition, loop, body} = ast;
  return [
    `for (${render(init)}; ${render(condition)}; ${render(loop)}) {`,
    render(body),
    '}',
  ].join('\n');
};

const renderForIn = (ast: ForInType) => {
  const {variable, iterator, body} = ast;
  return [
    `for (var ${render(variable)} in ${render(iterator)}) {`,
    render(body),
    '}',
  ].join('\n');
};

const renderFunction = (ast: Function1Type) => {
  const {name, argument, body} = ast;
  const vars = getVars(body);
  const varLines = vars.length === 0 ? [] : [`var ${vars.join(', ')};`];
  return [
    `function ${render(name)}(${render(argument)}) {`,
    ...varLines,
    render(body),
    '}',
  ].join('\n');
};

const renderUnop = (ast: UnopType) => {
  const child = `(${render(ast.child)})`;
  if (ast.style === 'prefix') {
    return `${ast.op}${child}`;
  } else {
    return `${child}${ast.op}`;
  }
};

const renderObjectLiteral = (ast: ObjectLiteralType) => {
  const {object} = ast;
  const lines = _.map(object, (value, key: string) => {
    const valueString = render(value);
    return `${key}: ${valueString.trimLeft()},`;
  });
  return ['{', ...lines, '}'].join('\n');
};

const STATEMENTS_WITH_SEMIS = [
  'assignment',
  'return',
  'binop',
  'call0',
  'call1',
  'call2',
  'unop',
];

const render = (ast: JsAst) => {
  switch (ast.type) {
    case 'assignment':
      return `${render(ast.variable)} = ${render(ast.value)}`;
    case 'if':
      return renderIf(ast);
    case 'return':
      return `return ${render(ast.value).trimLeft()}`;
    case 'body':
      return _.map(ast.body, s => {
        const suffix = _.includes(STATEMENTS_WITH_SEMIS, s.type) ? ';' : '';
        const line = render(s);
        return `${line}${suffix}`;
      }).join('\n');
    case 'for':
      return renderFor(ast);
    case 'forin':
      return renderForIn(ast);
    case 'empty':
      return '';
    case 'function1':
      return renderFunction(ast);
    case 'binop':
      return `${render(ast.left)} ${ast.comparator} ${render(ast.right)}`;
    case 'var':
      return ast.value;
    case 'literal':
      return ast.value;
    case 'call0':
      return `${render(ast.fn)}()`;
    case 'call1':
      return `${render(ast.fn)}(${render(ast.arg)})`;
    case 'call2':
      return `${render(ast.fn)}(${render(ast.arg1)}, ${render(ast.arg2)})`;
    case 'unop':
      return renderUnop(ast);
    case 'objectliteral':
      return renderObjectLiteral(ast);
    case 'propertyaccess':
      return `${render(ast.obj)}.${ast.property}`;
    case 'bracketaccess':
      return `${render(ast.obj)}[${render(ast.property)}]`;
    case 'typeof':
      return `typeof ${render(ast.child)}`;
    case 'comment':
      return `/* ${ast.comment} */`;
    case 'error':
      return '';
    default:
      throw new Error(`Unexpected AST: ${ast}`);
  }
};

export default render;
