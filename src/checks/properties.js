// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';

import Ast from '../jsast/ast.js';
import type {JsAst} from '../jsast/ast.js';

const additionalChecks = (
  properties: ?Object,
  patternProperties: ?Object,
  additionalProperties: void | Object | false,
  keySym: string,
  valSym: string,
  context: Context,
): JsAst => {
  // This generates a block of code like
  //   if (key === "key1" && error(check1(data))) { (error) }
  //   if (key === "key2" && error(check2(data))) { (error) }
  //   if (key.match(/pattern3/) && error(check3(data))) { (error) }
  //   if (key.match(/pattern4/) && error(check4(data))) { (error) }
  //   if (!hit && error(additionalCheck(data))) { (error) }
  const propertyChecks = _.map(properties, (subSchema, key) => ({
    predicate: `${keySym} === "${key}"`,
    subSchema,
  }));
  const patternChecks = _.map(patternProperties, (subSchema, pattern) => ({
    predicate: `${keySym}.match(/${pattern}/)`,
    subSchema,
  }));
  const allChecks = [...propertyChecks, ...patternChecks];

  if (additionalProperties === undefined) {
    // There are properties/patternProperties, but no additionalProperties. In
    // this case, we don't need to mark non-matches
    return Ast.Body(..._.map(allChecks, ({predicate, subSchema}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        predicate,
        Ast.If(
          Ast.Binop.Neq(Ast.Call(fnSym, valSym), 'null'),
          context.error(),
        ),
      );
    }));
  } else if (allChecks.length === 0) {
    // There are no properties nor patternProperties, but additionalProperties.
    // In this case, we can always run additionalProperties checks.
    if (additionalProperties === false) {
      return context.error();
    } else {
      const fnSym = context.symbolForSchema(additionalProperties);
      return Ast.If(
        Ast.Binop.Neq(Ast.Call(fnSym, valSym), 'null'),
        context.error(),
      );
    }
  } else {
    // There are both properties/patternProperties and additionalProperties. In
    // this case, we need to check if we've hit a property/patternProperty to
    // decide whether or not to check additionalProperties.
    const hitSym = context.gensym();
    const checks = _.map(allChecks, ({predicate, subSchema}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        predicate,
        Ast.If(
          Ast.Binop.Neq(Ast.Call(fnSym, valSym), 'null'),
          context.error(),
          Ast.Assignment(hitSym, 'true'),
        ),
      );
    });
    const additionalCheck = Ast.If(
      Ast.Binop.Eq(hitSym, 'false'),
      additionalProperties === false ? context.error() : Ast.If(
        `${context.symbolForSchema(additionalProperties)}(${valSym}) !== null`,
        context.error(),
      ),
    );
    return Ast.Body(
      Ast.Assignment(hitSym, 'false'),
      ...checks,
      additionalCheck,
    );
  }
};

const properties = (schema: Object, symbol: string, context: Context): JsAst => {
  if (schema.patternProperties || schema.additionalProperties !== undefined) {
    // Need to loop through all properties to check. We'll generate a loop:
    //   for (var key in json) {
    //     var val = json[key];
    //     var hit = false;
    //     if (key === property1) { ... }
    //     if (key === property2) { ... }
    //     if (key.match(pattern1)) { ... }
    //     if (key.match(pattern2)) { ... }
    //     if (!hit) { ... }
    //   }
    const keySym = context.gensym();
    const valSym = context.gensym();

    const loop = Ast.ForIn(keySym, Ast.Literal(symbol), Ast.Body(
      Ast.Assignment(valSym, `${symbol}[${keySym}]`),
      additionalChecks(
        schema.properties,
        schema.patternProperties,
        schema.additionalProperties,
        keySym,
        valSym,
        context,
      ),
    ));
    return util.typeCheck('object', symbol, loop);
  } else if (schema.properties) {
    // Static list of properties to check
    const checks = Ast.Body(..._.flatMap(schema.properties, (subSchema, key) => {
      const fnSym = context.symbolForSchema(subSchema);
      const sym = context.gensym();
      return Ast.Body(
        Ast.Assignment(sym, `${symbol}.${key}`),
        Ast.If(
          Ast.Binop.Neq(sym, 'undefined'),
          Ast.If(
            Ast.Binop.Neq(Ast.Call(fnSym, sym), 'null'),
            context.error(),
          ),
        ),
      );
    }));
    return util.typeCheck('object', symbol, checks);
  } else {
    return Ast.Empty;
  }
};

export default properties;
