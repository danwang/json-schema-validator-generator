// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import Ast from './flowast/ast.js';
import type {
  FlowType, TupleType, RecordType, UnionType, IntersectionType, MapType, ArrayType,
  OptionalType,
} from './flowast/ast.js';

const flowType = (schema: Object): FlowType => {
  if (schema.enum) {
    return Ast.Union(_.map(schema.enum, Ast.Exact));
  } else if (schema.anyOf) {
    return Ast.Union(_.map(schema.anyOf, flowType));
  } else if (schema.allOf) {
    return Ast.Intersection(_.map(schema.allOf, flowType));
  } else if (schema.type) {
    if (typeof schema.type === 'string') {
      switch (schema.type) {
        case 'boolean': return Ast.Boolean;
        case 'null': return Ast.Null;
        case 'integer': return Ast.Number;
        case 'number': return Ast.Number;
        case 'string': return Ast.String;
        case 'object': return objectFlowType(schema);
        case 'array': return arrayFlowType(schema);
        default: return Ast.Mixed;
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
      return Ast.Union(_.map(schemaArray, flowType));
    }
  } else {
    return Ast.Mixed;
  }
};

const objectFlowType = (schema: Object): FlowType => {
  // If properties, use emit a record. Otherwise, emit a map. We don't use
  // patternProperties because it's not expressable in flow.
  if (schema.properties) {
    const required = schema.required || [];
    return Ast.Record(_.mapValues(schema.properties, (subSchema, key) => {
      const subType = flowType(subSchema);
      if (required.includes(key)) {
        return subType;
      } else {
        return Ast.Optional(subType);
      }
    }));
  } else {
    const {additionalProperties} = schema;
    return Ast.Map(additionalProperties ? flowType(additionalProperties) : Ast.Mixed);
  }
};

const arrayFlowType = (schema: Object): FlowType => {
  if (schema.items) {
    if (_.isArray(schema.items)) {
      return Ast.Tuple(_.map(schema.items, flowType));
    } else {
      return Ast.Array(flowType(schema.items));
    }
  } else {
    return Ast.Array(Ast.Mixed);
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
      return Ast.Optional(simplified);
  }
};
const simplifyArray = (ft: ArrayType) => Ast.Array(simplify(ft.child));
const simplifyMap = (ft: MapType) => Ast.Map(simplify(ft.child));
const simplifyTuple = (ft: TupleType) => Ast.Tuple(_.map(ft.children, simplify));
const simplifyRecord = (ft: RecordType) => Ast.Record(_.mapValues(ft.fields, simplify));
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
    case 'union': return simplifyIU(Ast.Union, ft);
    case 'intersection': return simplifyIU(Ast.Intersection, ft);
    default:
      return ft;
  }
};

export default (schema: Object) => simplify(flowType(schema));
