// @flow
/* eslint-disable no-use-before-define */
import _ from 'lodash';
import Ast from 'flow/ast/ast.js';
import type {FlowAst, OptionalType} from 'flow/ast/ast.js';

const simplifyOptional = (ft: OptionalType) => {
  const {child} = ft;
  const simplified = simplify(child);
  switch (child.type) {
    case 'optional':
      return simplified;
    default:
      return Ast.Optional(simplified);
  }
};
const simplifyIU = (
  Constructor: (c: Array<FlowAst>) => FlowAst,
  children: Array<FlowAst>
) => {
  const unique = _.uniqWith(_.map(children, simplify), _.isEqual);
  if (unique.length === 1) {
    return unique[0];
  } else {
    return Constructor(unique);
  }
};

const simplify = (ft: FlowAst): FlowAst => {
  switch (ft.type) {
    case 'declaration':
      return Ast.Declaration(ft.name, simplify(ft.value));
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
