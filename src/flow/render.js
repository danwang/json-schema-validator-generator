// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {FlowType, TupleType, RecordType} from 'flow/ast/ast.js';
import util from 'util.js';

const renderExact = (value: mixed, depth: number) => JSON.stringify(value);
const renderTuple = (ft: TupleType, depth: number) => {
  const contents = _.map(ft.children, (child) => {
    const rendered = render(child, depth + 1);
    return util.indent(`${rendered},`, depth);
  });
  return [
    '[',
    ...contents,
    util.indent(']', depth),
  ].join('\n');
};

const renderRecord = (ft: RecordType, depth: number) => {
  const contents = _.map(ft.fields, (subtype, key) => {
    if (subtype.type === 'optional') {
      const rendered = render(subtype.child, depth + 1);
      return util.indent(`${key}?: ${rendered},`, depth + 1);
    } else {
      const rendered = render(subtype, depth + 1);
      return util.indent(`${key}: ${rendered},`, depth + 1);
    }
  });
  return [
    '{',
    ...contents,
    util.indent('}', depth),
  ].join('\n');
};

const render = (ft: FlowType, depth: number = 0): string => {
  switch (ft.type) {
    case 'declaration':
      return `declare type ${ft.name} = ${render(ft.value, depth)};`;
    case 'type':
      return `type ${ft.name} = ${render(ft.value, depth)};`;
    case 'literal':
      return ft.value;
    case 'exact':
      return renderExact(ft.value, depth);
    case 'mixed':
    case 'boolean':
    case 'null':
    case 'number':
    case 'string':
      return ft.type;
    case 'optional':
      return `?${render(ft.child, depth)}`;
    case 'array':
      return `Array<${render(ft.child, depth)}>`;
    case 'map':
      return `{[key: string]: ${render(ft.child, depth)}}`;
    case 'tuple':
      return renderTuple(ft, depth);
    case 'record':
      return renderRecord(ft, depth);
    case 'union':
      return _.map(ft.children, (child) => render(child, depth)).join(' | ');
    case 'intersection':
      return _.map(ft.children, (child) => render(child, depth)).join(' & ');
    default:
      return '';
  }
};

export default render;
