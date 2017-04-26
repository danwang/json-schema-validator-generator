// @flow
import _ from 'lodash';
import type {Context} from 'js/generate.js';
import Ast from 'js/ast/ast.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import M from 'js/ast/macros';

const additionalPropertiesCheck = (
  schema: JsonSchema,
  symbol: VarType,
  context: Context,
): JsAst => {
  const {additionalProperties} = schema;
  if (additionalProperties === false) {
    return context.error(schema, 'additionalProperties');
  } else if (additionalProperties && typeof additionalProperties === 'object') {
    return Ast.If(
      M.FailedCheck(additionalProperties, symbol, context),
      context.error(schema, 'additionalProperties'),
    );
  } else {
    return Ast.Empty;
  }
};

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
  // Two cases where we don't need a hit counter:
  //   - There are no additionalProperties or patternProperties
  //   - There are no properties
  if (allChecks.length === 0 || (additionalProperties === undefined || additionalProperties === true)) {
    const checks = _.map(allChecks, ({predicate, subSchema, error}) => {
      return Ast.If(
        predicate,
        Ast.If(
          M.FailedCheck(subSchema, valSym, context),
          error,
        ),
      );
    });
    return Ast.Body(
      ...checks,
      additionalPropertiesCheck(schema, valSym, context),
    );
  } else {
    const hitSym = context.gensym();
    const checks = _.map(allChecks, ({predicate, subSchema, error}) => {
      return Ast.If(
        predicate,
        Ast.If(
          M.FailedCheck(subSchema, valSym, context),
          error,
          Ast.Assignment(hitSym, Ast.True),
        ),
      );
    });
    return Ast.Body(
      Ast.Assignment(hitSym, Ast.False),
      ...checks,
      Ast.If(
        Ast.Binop.Eq(hitSym, Ast.False),
        additionalPropertiesCheck(schema, valSym, context),
      ),
    );
  }
};

const _properties = (schema: JsonSchema, symbol: VarType, context: Context): JsAst => {
  const {properties, required, patternProperties, additionalProperties} = schema;
  if (!patternProperties && (additionalProperties === undefined || additionalProperties === true)) {
    // Static list of properties to check
    const sym = context.gensym();
    const checks = Ast.Body(..._.flatMap(properties, (subSchema, key) => {
      const isRequired = _.includes(required, key);
      return Ast.Body(
        Ast.Assignment(sym, Ast.PropertyAccess(symbol, key)),
        Ast.If(
          Ast.Binop.Neq(sym, Ast.Undefined),
          Ast.If(
            M.FailedCheck(subSchema, sym, context),
            context.error(schema, `properties[${key}]`),
          ),
          isRequired ? context.error(schema, `required[${key}]`) : Ast.Empty,
        ),
      );
    }));
    return M.TypeCheck('object', symbol, checks);
  } else {
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
        properties,
        patternProperties,
        additionalProperties,
        keySym,
        valSym,
        context,
      ),
    ));
    const requiredChecks = _.map(required, (property) => {
      return Ast.If(
        Ast.Binop.Eq(Ast.PropertyAccess(symbol, property), Ast.Undefined),
        context.error(schema, `required[${property}]`),
      );
    });
    return M.TypeCheck('object', symbol, Ast.Body(loop, ...requiredChecks));
  }
};

export default _properties;
