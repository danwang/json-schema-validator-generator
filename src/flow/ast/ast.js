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
  value: FlowAst,
};
export type TypeType = {
  type: 'type',
  name: string,
  value: FlowAst,
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
  child: FlowAst,
};
type ArrayType = {
  type: 'array',
  child: FlowAst,
};
export type TupleType = {
  type: 'tuple',
  children: Array<FlowAst>,
};
export type RecordType = {
  type: 'record',
  fields: {
    [key: string]: FlowAst,
  },
};
type MapType = {
  type: 'map',
  child: FlowAst,
};
type UnionType = {
  type: 'union',
  children: Array<FlowAst>,
};
type IntersectionType = {
  type: 'intersection',
  children: Array<FlowAst>,
};

export type FlowAst =
  | MixedType
  | BooleanType
  | NullType
  | NumberType
  | StringType
  | DeclarationType
  | TypeType
  | LiteralType
  | ExactType
  | OptionalType
  | ArrayType
  | TupleType
  | RecordType
  | MapType
  | UnionType
  | IntersectionType;

const Mixed: MixedType = {type: 'mixed'};
const Boolean: BooleanType = {type: 'boolean'};
const Null: NullType = {type: 'null'};
const Number: NumberType = {type: 'number'};
const String: StringType = {type: 'string'};

const Declaration = (name: string, value: FlowAst): DeclarationType => ({
  type: 'declaration',
  name,
  value,
});
const Type = (name: string, value: FlowAst): TypeType => ({
  type: 'type',
  name,
  value,
});
const Literal = (value: string): LiteralType => ({type: 'literal', value});
const Exact = (value: mixed): ExactType => ({type: 'exact', value});
const Optional = (child: FlowAst): OptionalType => ({type: 'optional', child});
const Array = (child: FlowAst): ArrayType => ({type: 'array', child});
const Tuple = (children: Array<FlowAst>): TupleType => ({
  type: 'tuple',
  children,
});
const Record = (fields: {[key: string]: FlowAst}): RecordType => ({
  type: 'record',
  fields,
});
const Map = (child: FlowAst): MapType => ({type: 'map', child});
const Union = (children: Array<FlowAst>): UnionType => ({
  type: 'union',
  children,
});
const Intersection = (children: Array<FlowAst>): IntersectionType => ({
  type: 'intersection',
  children,
});

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
