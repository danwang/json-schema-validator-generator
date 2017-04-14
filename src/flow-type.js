// @flow
import _ from 'lodash';

type MixedType = {type: 'mixed'};

type BooleanType = {type: 'boolean'};
type NullType = {type: 'null'};
type NumberType = {type: 'number'};
type StringType = {type: 'string'};

type ExactType = {
  type: 'exact',
  value: mixed,
};
type OptionalType = {
  type: 'optional',
  childType: FlowType, // eslint-disable-line no-use-before-define
};
type ArrayType = {
  type: 'array',
  itemType: FlowType, // eslint-disable-line no-use-before-define
};
type TupleType = {
  type: 'tuple',
  childTypes: Array<FlowType>, // eslint-disable-line no-use-before-define
};
type RecordType = {
  type: 'record',
  fields: {
    [key: string]: FlowType, // eslint-disable-line no-use-before-define
  },
};
type MapType = {
  type: 'map',
  valueType: FlowType, // eslint-disable-line no-use-before-define
};
type UnionType = {
  type: 'union',
  childTypes: Array<FlowType>, // eslint-disable-line no-use-before-define
};
type IntersectionType = {
  type: 'intersection',
  childTypes: Array<FlowType>, // eslint-disable-line no-use-before-define
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
export const Optional = (childType: FlowType): OptionalType => ({type: 'optional', childType});
export const Array = (itemType: FlowType): ArrayType => ({type: 'array', itemType});
export const Tuple = (childTypes: Array<FlowType>): TupleType => ({type: 'tuple', childTypes});
export const Record = (fields: {[key: string]: FlowType}): RecordType => ({type: 'record', fields});
export const Map = (valueType: FlowType): MapType => ({type: 'map', valueType});
export const Union = (childTypes: Array<FlowType>): UnionType => ({type: 'union', childTypes});
export const Intersection = (childTypes: Array<FlowType>): IntersectionType => ({type: 'intersection', childTypes});

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
        case 'boolean':
          return Boolean;
        case 'null':
          return Null;
        case 'integer':
        case 'number':
          return Number;
        case 'string':
          return String;
        case 'object':
          return objectFlowType(schema); // eslint-disable-line no-use-before-define
        case 'array':
          return arrayFlowType(schema); // eslint-disable-line no-use-before-define
        default:
          return Mixed;
      }
    } else {
      // type can be either:
      //   - A string
      //   - An array of strings or schemas
      // so we transform to an array of schemas and reduce later
      const typeArray = (typeof schema.type === 'string') ? [schema.type] : schema.type;
      const schemaArray = _.map(typeArray, (stringOrSchema) => {
        if (typeof stringOrSchema === 'string') {
          return {type: stringOrSchema};
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

const simplify = (ft: FlowType): FlowType => {
  switch (ft.type) {
    case 'optional':
      const {childType} = ft;
      if (childType.type === 'optional') {
        return simplify(childType);
      } else {
        return Optional(simplify(ft.childType));
      }
    case 'union':
    case 'intersection':
      if (ft.childTypes.length === 1) {
        return simplify(ft.childTypes[0]);
      } else {
        const childTypes = _.map(_.uniqWith(ft.childTypes, _.isEqual), simplify);
        return ({
          type: ft.type,
          childTypes,
        }: any);
      }
    default:
      return ft;
  }
};

export default (schema: Object) => simplify(flowType(schema));
