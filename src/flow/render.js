// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import type {FlowType, TupleType, RecordType} from 'jsvg/flow/ast/ast.js';
import util from 'jsvg/util.js';

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
    const rendered = render(subtype, depth + 1);
    return util.indent(`  ${key}: ${rendered},`, depth);
  });
  return [
    '{',
    ...contents,
    util.indent('}', depth),
  ].join('\n');
};

const render = (ft: FlowType, depth: number): string => {
  switch (ft.type) {
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
