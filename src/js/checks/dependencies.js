// @flow
import _ from 'lodash';
import type {Context} from 'types.js';
import Ast from 'js/jsast/ast.js';
import type {JsAst} from 'js/jsast/ast.js';
import util from 'util.js';

const dependencies = (schema: JsonSchema, symbol: string, context: Context): JsAst => {
  if (schema.dependencies) {
    const checks = _.map(schema.dependencies, (check, key) => {
      if (typeof check === 'string') {
        return Ast.If(
          Ast.Binop.And(
            Ast.Binop.Neq(`${symbol}.${key}`, Ast.Undefined),
            Ast.Binop.Eq(`${symbol}.${check}`, Ast.Undefined),
          ),
          context.error(),
        );
      } else if (Array.isArray(check)) {
        const ifs = check.map((k) => Ast.If(
          Ast.Binop.Eq(`${symbol}.${k}`, Ast.Undefined),
          context.error(),
        ));
        return Ast.If(
          Ast.Binop.Neq(`${symbol}.${key}`, Ast.Undefined),
          Ast.Body(...ifs),
        );
      } else {
        const fnSym = context.symbolForSchema(check);
        return Ast.If(
          Ast.Binop.And(
            Ast.Binop.Neq(`${symbol}.${key}`, Ast.Undefined),
            Ast.Binop.Neq(Ast.Call(fnSym, symbol), Ast.Null),
          ),
          context.error(),
        );
      }
    });
    return util.typeCheck('object', symbol, Ast.Body(...checks));
  } else {
    return Ast.Empty;
  }
};

export default dependencies;
