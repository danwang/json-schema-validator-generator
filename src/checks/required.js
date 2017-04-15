// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';
import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const required = (schema: Object, symbol: string, context: Context): JsAst => {
  if (Array.isArray(schema.required)) {
    const checks: Array<JsAst> = _.map(schema.required, (property) => {
      return Ast.If(Ast.Binop.Eq(`${symbol}.${property}`, 'undefined'), context.error());
    });
    return util.typeCheck('object', symbol, Ast.Body(...checks));
  } else {
    return Ast.Empty;
  }
};

export default required;
