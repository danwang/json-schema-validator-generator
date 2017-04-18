// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import Ast from 'jsvg/flow/ast/ast.js';
import type {FlowType, OptionalType} from 'jsvg/flow/ast/ast.js';

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
const simplifyIU = (Constructor: (c: Array<FlowType>) => FlowType, children: Array<FlowType>) => {
  const unique = _.uniqWith(_.map(children, simplify), _.isEqual);
  if (unique.length === 1) {
    return unique[0];
  } else {
    return Constructor(unique);
  }
};

const simplify = (ft: FlowType): FlowType => {
  switch (ft.type) {
    case 'optional':
      return simplifyOptional(ft);
    case 'array':
      return Ast.Array(simplify(ft.child));
    case 'map':
      return Ast.Map(simplify(ft.child));
    case 'tuple':
      return Ast.Tuple(_.map(ft.children, simplify));
    case 'record':
      return Ast.Record(_.mapValues(ft.fields, simplify));
    case 'union':
      return simplifyIU(Ast.Union, ft.children);
    case 'intersection':
      return simplifyIU(Ast.Intersection, ft.children);
    default:
      return ft;
  }
};

export default simplify;
