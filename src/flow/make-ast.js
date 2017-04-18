// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import Ast from 'jsvg/flow/ast/ast.js';
import type {FlowType} from 'jsvg/flow/ast/ast.js';
import simplify from 'jsvg/flow/simplify.js';

const makeAst = (schema: Object): FlowType => {
  if (schema.enum) {
    return Ast.Union(_.map(schema.enum, Ast.Exact));
  } else if (schema.anyOf) {
    return Ast.Union(_.map(schema.anyOf, makeAst));
  } else if (schema.allOf) {
    return Ast.Intersection(_.map(schema.allOf, makeAst));
  } else if (schema.type) {
    if (typeof schema.type === 'string') {
      switch (schema.type) {
        case 'boolean': return Ast.Boolean;
        case 'null': return Ast.Null;
        case 'integer': return Ast.Number;
        case 'number': return Ast.Number;
        case 'string': return Ast.String;
        case 'object': return makeObjectAst(schema);
        case 'array': return makeArrayAst(schema);
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
      return Ast.Union(_.map(schemaArray, makeAst));
    }
  } else {
    return Ast.Mixed;
  }
};

const makeObjectAst = (schema: Object): FlowType => {
  // If properties, use emit a record. Otherwise, emit a map. We don't use
  // patternProperties because it's not expressable in flow.
  if (schema.properties) {
    const required = schema.required || [];
    return Ast.Record(_.mapValues(schema.properties, (subSchema, key) => {
      const subType = makeAst(subSchema);
      if (required.includes(key)) {
        return subType;
      } else {
        return Ast.Optional(subType);
      }
    }));
  } else {
    const {additionalProperties} = schema;
    return Ast.Map(additionalProperties ? makeAst(additionalProperties) : Ast.Mixed);
  }
};

const makeArrayAst = (schema: Object): FlowType => {
  if (schema.items) {
    if (_.isArray(schema.items)) {
      return Ast.Tuple(_.map(schema.items, makeAst));
    } else {
      return Ast.Array(makeAst(schema.items));
    }
  } else {
    return Ast.Array(Ast.Mixed);
  }
};

export default (schema: Object) => simplify(makeAst(schema));
