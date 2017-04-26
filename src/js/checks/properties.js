// @flow
import _ from 'lodash';
import util from 'util.js';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';

const additionalChecks = (
  schema: JsonSchema,
  properties: $PropertyType<JsonSchema, 'properties'>,
  patternProperties: $PropertyType<JsonSchema, 'patternProperties'>,
  additionalProperties: $PropertyType<JsonSchema, 'additionalProperties'>,
  keySym: VarType,
  valSym: VarType,
  context: Context,
): JsAst => {
  // This generates a block of code like
  //   if (key === "key1" && error(check1(data))) { (error) }
  //   if (key === "key2" && error(check2(data))) { (error) }
  //   if (key.match(/pattern3/) && error(check3(data))) { (error) }
  //   if (key.match(/pattern4/) && error(check4(data))) { (error) }
  //   if (!hit && error(additionalCheck(data))) { (error) }
  const propertyChecks = _.map(properties, (subSchema, key) => ({
    predicate: Ast.Binop.Eq(keySym, Ast.StringLiteral(key)),
    subSchema,
    error: context.error(schema, `properties[${key}]`),
  }));
  const patternChecks = _.map(patternProperties, (subSchema, pattern) => ({
    predicate: Ast.Call(
      Ast.PropertyAccess(keySym, 'match'),
      Ast.Literal(`/${pattern}/`),
    ),
    subSchema,
    error: context.error(schema, `properties[${pattern}]`),
  }));
  const allChecks = [...propertyChecks, ...patternChecks];

  if (additionalProperties === undefined || additionalProperties === null || additionalProperties === true) {
    // There are properties/patternProperties, but no additionalProperties. In
    // this case, we don't need to mark non-matches
    return Ast.Body(..._.map(allChecks, ({predicate, subSchema, error}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        predicate,
        Ast.If(
          Ast.Binop.Neq(Ast.Call(fnSym, valSym), Ast.Null),
          error,
        ),
      );
    }));
  } else if (allChecks.length === 0) {
    const error = context.error(schema, 'additionalProperties');
    // There are no properties nor patternProperties, but additionalProperties.
    // In this case, we can always run additionalProperties checks.
    if (additionalProperties === false) {
      return error;
    } else {
      const fnSym = context.symbolForSchema(additionalProperties);
      return Ast.If(
        Ast.Binop.Neq(Ast.Call(fnSym, valSym), Ast.Null),
        error,
      );
    }
  } else {
    // There are both properties/patternProperties and additionalProperties. In
    // this case, we need to check if we've hit a property/patternProperty to
    // decide whether or not to check additionalProperties.
    const hitSym = context.gensym();
    const checks = _.map(allChecks, ({predicate, subSchema, error}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.If(
        predicate,
        Ast.If(
          Ast.Binop.Neq(Ast.Call(fnSym, valSym), Ast.Null),
          error,
          Ast.Assignment(hitSym, Ast.True),
        ),
      );
    });
    const additionalError = context.error(schema, 'additionalProperties');
    const additionalCheck = Ast.If(
      Ast.Binop.Eq(hitSym, Ast.False),
      additionalProperties === false ? additionalError : Ast.If(
        Ast.Binop.Neq(
          Ast.Call(context.symbolForSchema(additionalProperties), valSym),
          Ast.Null,
        ),
        additionalError,
      ),
    );
    return Ast.Body(
      Ast.Assignment(hitSym, Ast.False),
      ...checks,
      additionalCheck,
    );
  }
};

const properties = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
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

    const loop = Ast.ForIn(keySym, symbol, Ast.Body(
      Ast.Assignment(valSym, Ast.BracketAccess(symbol, keySym)),
      additionalChecks(
        schema,
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
    const sym = context.gensym();
    const checks = Ast.Body(..._.flatMap(schema.properties, (subSchema, key) => {
      const fnSym = context.symbolForSchema(subSchema);
      return Ast.Body(
        Ast.Assignment(sym, Ast.PropertyAccess(symbol, key)),
        Ast.If(
          Ast.Binop.Neq(sym, Ast.Undefined),
          Ast.If(
            Ast.Binop.Neq(Ast.Call(fnSym, sym), Ast.Null),
            context.error(schema, `properties[${key}]`),
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
