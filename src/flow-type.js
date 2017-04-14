// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';

type MixedType = {type: 'mixed'};
type BooleanType = {type: 'boolean'};
type NullType = {type: 'null'};
type NumberType = {type: 'number'};
type StringType = {type: 'string'};

export type ExactType = {
  type: 'exact',
  value: mixed,
};
export type OptionalType = {
  type: 'optional',
  child: FlowType,
};
export type ArrayType = {
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
export type MapType = {
  type: 'map',
  child: FlowType,
};
export type UnionType = {
  type: 'union',
  children: Array<FlowType>,
};
export type IntersectionType = {
  type: 'intersection',
  children: Array<FlowType>,
};

export type FlowType = (
  MixedType |
  BooleanType |
  NullType |
  NumberType |
  StringType |
  ExactType |
  OptionalType |
  ArrayType |
  TupleType |
  RecordType |
  MapType |
  UnionType |
  IntersectionType
);

export const Mixed: MixedType = {type: 'mixed'};
export const Boolean: BooleanType = {type: 'boolean'};
export const Null: NullType = {type: 'null'};
export const Number: NumberType = {type: 'number'};
export const String: StringType = {type: 'string'};

export const Exact = (value: mixed): ExactType => ({type: 'exact', value});
export const Optional = (child: FlowType): OptionalType => ({type: 'optional', child});
export const Array = (child: FlowType): ArrayType => ({type: 'array', child});
export const Tuple = (children: Array<FlowType>): TupleType => ({type: 'tuple', children});
export const Record = (fields: {[key: string]: FlowType}): RecordType => ({type: 'record', fields});
export const Map = (child: FlowType): MapType => ({type: 'map', child});
export const Union = (children: Array<FlowType>): UnionType => ({type: 'union', children});
export const Intersection = (children: Array<FlowType>): IntersectionType => ({type: 'intersection', children});

const flowType = (schema: Object): FlowType => {
  if (schema.enum) {
    return Union(_.map(schema.enum, Exact));
  } else if (schema.anyOf) {
    return Union(_.map(schema.anyOf, flowType));
  } else if (schema.allOf) {
    return Intersection(_.map(schema.allOf, flowType));
  } else if (schema.type) {
    if (typeof schema.type === 'string') {
      switch (schema.type) {
        case 'boolean': return Boolean;
        case 'null': return Null;
        case 'integer': return Number;
        case 'number': return Number;
        case 'string': return String;
        case 'object': return objectFlowType(schema);
        case 'array': return arrayFlowType(schema);
        default: return Mixed;
      }
    } else {
      // type can be either a string or an array of strings or schemas, so we
      // transform to an array of schemas and reduce later
      const typeArray = (typeof schema.type === 'string') ? [schema.type] : schema.type;
      const schemaArray = _.map(typeArray, (stringOrSchema) => {
        if (typeof stringOrSchema === 'string') {
          return {
            ...schema,
            type: stringOrSchema,
          };
        } else {
          return stringOrSchema;
        }
      });
      return Union(_.map(schemaArray, flowType));
    }
  } else {
    return Mixed;
  }
};

const objectFlowType = (schema: Object): FlowType => {
  // If properties, use emit a record. Otherwise, emit a map. We don't use
  // patternProperties because it's not expressable in flow.
  if (schema.properties) {
    const required = schema.required || [];
    return Record(_.mapValues(schema.properties, (subSchema, key) => {
      const subType = flowType(subSchema);
      if (required.includes(key)) {
        return subType;
      } else {
        return Optional(subType);
      }
    }));
  } else {
    const {additionalProperties} = schema;
    return Map(additionalProperties ? flowType(additionalProperties) : Mixed);
  }
};

const arrayFlowType = (schema: Object): FlowType => {
  if (schema.items) {
    if (_.isArray(schema.items)) {
      return Tuple(_.map(schema.items, flowType));
    } else {
      return Array(flowType(schema.items));
    }
  } else {
    return Array(Mixed);
  }
};

const simplifyOptional = (ft: OptionalType) => {
  const {child} = ft;
  const simplified = simplify(child);
  switch (child.type) {
    case 'optional':
    case 'mixed':
      return simplified;
    default:
      return Optional(simplified);
  }
};
const simplifyArray = (ft: ArrayType) => Array(simplify(ft.child));
const simplifyMap = (ft: MapType) => Map(simplify(ft.child));
const simplifyTuple = (ft: TupleType) => Tuple(_.map(ft.children, simplify));
const simplifyRecord = (ft: RecordType) => Record(_.mapValues(ft.fields, simplify));
const simplifyIU = <T: IntersectionType | UnionType>(Constructor: (c: Array<FlowType>) => T, ft: T) => {
  const {children} = ft;
  if (children.length === 1) {
    return simplify(children[0]);
  } else {
    const mappedChildren = _.map(_.uniqWith(children, _.isEqual), simplify);
    return Constructor(mappedChildren);
  }
};

const simplify = (ft: FlowType): FlowType => {
  switch (ft.type) {
    case 'optional': return simplifyOptional(ft);
    case 'array': return simplifyArray(ft);
    case 'map': return simplifyMap(ft);
    case 'tuple': return simplifyTuple(ft);
    case 'record': return simplifyRecord(ft);
    case 'union': return simplifyIU(Union, ft);
    case 'intersection': return simplifyIU(Intersection, ft);
    default:
      return ft;
  }
};

export default (schema: Object) => simplify(flowType(schema));
