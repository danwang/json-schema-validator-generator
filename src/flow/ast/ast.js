// @flow
/* eslint-disable no-use-before-define */
type MixedType = {type: 'mixed'};
type BooleanType = {type: 'boolean'};
type NullType = {type: 'null'};
type NumberType = {type: 'number'};
type StringType = {type: 'string'};

type DeclarationType = {
  type: 'declaration',
  name: string,
  value: FlowType,
};
type TypeType = {
  type: 'type',
  name: string,
  value: FlowType,
};
type LiteralType = {
  type: 'literal',
  value: string,
};
type ExactType = {
  type: 'exact',
  value: mixed,
};
export type OptionalType = {
  type: 'optional',
  child: FlowType,
};
type ArrayType = {
  type: 'array',
  child: FlowType,
};
export type TupleType = {
  type: 'tuple',
  children: Array<FlowType>,
};
export type RecordType = {
  type: 'record',
  fields: {
    [key: string]: FlowType,
  },
};
type MapType = {
  type: 'map',
  child: FlowType,
};
type UnionType = {
  type: 'union',
  children: Array<FlowType>,
};
type IntersectionType = {
  type: 'intersection',
  children: Array<FlowType>,
};

export type FlowType = (
  MixedType |
  BooleanType |
  NullType |
  NumberType |
  StringType |
  DeclarationType |
  TypeType |
  LiteralType |
  ExactType |
  OptionalType |
  ArrayType |
  TupleType |
  RecordType |
  MapType |
  UnionType |
  IntersectionType
);

const Mixed: MixedType = {type: 'mixed'};
const Boolean: BooleanType = {type: 'boolean'};
const Null: NullType = {type: 'null'};
const Number: NumberType = {type: 'number'};
const String: StringType = {type: 'string'};

const Declaration = (name: string, value: FlowType): DeclarationType => ({type: 'declaration', name, value});
const Type = (name: string, value: FlowType): TypeType => ({type: 'type', name, value});
const Literal = (value: string): LiteralType => ({type: 'literal', value});
const Exact = (value: mixed): ExactType => ({type: 'exact', value});
const Optional = (child: FlowType): OptionalType => ({type: 'optional', child});
const Array = (child: FlowType): ArrayType => ({type: 'array', child});
const Tuple = (children: Array<FlowType>): TupleType => ({type: 'tuple', children});
const Record = (fields: {[key: string]: FlowType}): RecordType => ({type: 'record', fields});
const Map = (child: FlowType): MapType => ({type: 'map', child});
const Union = (children: Array<FlowType>): UnionType => ({type: 'union', children});
const Intersection = (children: Array<FlowType>): IntersectionType => ({type: 'intersection', children});

export default {
  Mixed,
  Boolean,
  Null,
  Number,
  String,
  Declaration,
  Type,
  Literal,
  Exact,
  Optional,
  Array,
  Tuple,
  Record,
  Map,
  Union,
  Intersection,
};
