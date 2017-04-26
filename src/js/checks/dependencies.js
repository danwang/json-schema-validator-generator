// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import util from 'util.js';
import M from 'js/ast/macros';

const dependencies = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  if (schema.dependencies) {
    const checks = _.map(schema.dependencies, (check, key) => {
      const error = context.error(schema, `dependencies[${key}]`);
      if (typeof check === 'string') {
        return Ast.If(
          Ast.Binop.And(
            Ast.Binop.Neq(Ast.PropertyAccess(symbol, key), Ast.Undefined),
            Ast.Binop.Eq(Ast.PropertyAccess(symbol, check), Ast.Undefined),
          ),
          error,
        );
      } else if (Array.isArray(check)) {
        const ifs = check.map((k) => Ast.If(
          Ast.Binop.Eq(Ast.PropertyAccess(symbol, k), Ast.Undefined),
          error,
        ));
        return Ast.If(
          Ast.Binop.Neq(Ast.PropertyAccess(symbol, key), Ast.Undefined),
          Ast.Body(...ifs),
        );
      } else {
        return Ast.If(
          Ast.Binop.Neq(Ast.PropertyAccess(symbol, key), Ast.Undefined),
          Ast.If(
            M.FailedCheck(check, symbol, context),
            error,
          ),
        );
      }
    });
    return util.typeCheck('object', symbol, Ast.Body(...checks));
  } else {
    return Ast.Empty;
  }
};

export default dependencies;
