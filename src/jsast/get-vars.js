// @flow
import _ from 'lodash';
import type {JsAst} from './ast.js';

const _getVars = (ast: JsAst): Array<string> => {
  switch (ast.type) {
    case 'assignment':
      return [ast.variable];
    case 'if':
      return [
        ..._getVars(ast.predicate),
        ..._getVars(ast.body),
        ..._getVars(ast.elseBody),
      ];
    case 'return':
      return _getVars(ast.value);
    case 'body':
      return _.flatMap(ast.body, _getVars);
    case 'for':
      return [
        ..._getVars(ast.init),
        ..._getVars(ast.condition),
        ..._getVars(ast.loop),
        ..._getVars(ast.body),
      ];
    case 'forin':
      return [
        ast.variable,
        ..._getVars(ast.iterator),
        ..._getVars(ast.body),
      ];
    case 'empty':
      return [];
    case 'function1':
      return [];
    case 'binop':
      return [
        ..._getVars(ast.left),
        ..._getVars(ast.right),
      ];
    case 'literal':
      return [];
    default:
      throw new Error(`Unexpected AST: ${ast}`);
  }
};

const getVars = (ast: JsAst) => _.uniq(_getVars(ast));
export default getVars;
