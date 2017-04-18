// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import flowType from 'jsvg/flow-type.js';
import type {FlowType, TupleType, RecordType, UnionType, IntersectionType} from 'jsvg/flowast/ast.js';
import util from 'jsvg/util.js';

const generateExact = (value: mixed, depth: number) => JSON.stringify(value);
const generateTuple = (ft: TupleType, depth: number) => {
  const contents = _.map(ft.children, (child) => {
    const generated = generateFlow(child, depth + 1);
    return util.indentN(`${generated},`, depth);
  });
  return [
    '[',
    ...contents,
    util.indentN(']', depth),
  ].join('\n');
};

const generateRecord = (ft: RecordType, depth: number) => {
  const contents = _.map(ft.fields, (subtype, key) => {
    const generated = generateFlow(subtype, depth + 1);
    return util.indentN(`  ${key}: ${generated},`, depth);
  });
  return [
    '{',
    ...contents,
    util.indentN('}', depth),
  ].join('\n');
};

const generateUnion = (ft: UnionType, depth: number) => {
  return _.map(ft.children, (child) => generateFlow(child, depth)).join(' | ');
};

const generateIntersection = (ft: IntersectionType, depth: number) => {
  return _.map(ft.children, (child) => generateFlow(child, depth)).join(' & ');
};

const generateFlow = (ft: FlowType, depth: number): string => {
  switch (ft.type) {
    case 'exact':
      return generateExact(ft.value, depth);
    case 'mixed':
    case 'boolean':
    case 'null':
    case 'number':
    case 'string':
      return ft.type;
    case 'optional':
      return `?${generateFlow(ft.child, depth)}`;
    case 'array':
      return `Array<${generateFlow(ft.child, depth)}>`;
    case 'map':
      return `{[key: string]: ${generateFlow(ft.child, depth)}}`;
    case 'tuple':
      return generateTuple(ft, depth);
    case 'record':
      return generateRecord(ft, depth);
    case 'union':
      return generateUnion(ft, depth);
    case 'intersection':
      return generateIntersection(ft, depth);
    default:
      return '';
  }
};

const generateFlowFromSchema = (schema: Object) => generateFlow(flowType(schema), 0);
export default generateFlowFromSchema;
