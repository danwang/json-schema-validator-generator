// @flow
import _ from 'lodash';
import util from '../util.js';
import type {Context} from '../types.js';

const additionalChecks = (
  properties: ?Object,
  patternProperties: ?Object,
  additionalProperties: void | Object | false,
  keySym: string,
  valSym: string,
  context: Context,
): Array<string> => {
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
    return _.flatMap(allChecks, ({predicate, subSchema}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return util.ifs(
        predicate,
        util.ifs(
          `${fnSym}(${valSym}) !== null`,
          context.error(),
        ),
      );
    });
  } else if (allChecks.length === 0) {
    // There are no properties nor patternProperties, but additionalProperties.
    // In this case, we can always run additionalProperties checks.
    if (additionalProperties === false) {
      return context.error();
    } else {
      const fnSym = context.symbolForSchema(additionalProperties);
      return util.ifs(
        `${fnSym}(${valSym}) !== null`,
        context.error(),
      );
    }
  } else {
    // There are both properties/patternProperties and additionalProperties. In
    // this case, we need to check if we've hit a property/patternProperty to
    // decide whether or not to check additionalProperties.
    const hitSym = context.gensym();
    const checks = _.flatMap(allChecks, ({predicate, subSchema}) => {
      const fnSym = context.symbolForSchema(subSchema);
      return util.ifs(
        predicate,
        util.ifs(
          `${fnSym}(${valSym}) !== null`,
          context.error(),
          `${hitSym} = true;`,
        ),
      );
    });
    const additionalCheck = util.ifs(
      `${hitSym} === false`,
      additionalProperties === false ? context.error() : util.ifs(
        `${context.symbolForSchema(additionalProperties)}(${valSym}) !== null`,
        context.error(),
      ),
    );
    return [
      `var ${hitSym} = false;`,
      ...checks,
      ...additionalCheck,
    ];
  }
};

const properties = (schema: Object, symbol: string, context: Context): Array<string> => {
  if (schema.patternProperties || schema.additionalProperties) {
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

    const loop = [
      `for (var ${keySym} in ${symbol}) {`,
      util.indent(`var ${valSym} = ${symbol}[${keySym}];`),
      ...additionalChecks(
        schema.properties,
        schema.patternProperties,
        schema.additionalProperties,
        keySym,
        valSym,
        context,
      ).map(util.indent),
      '}',
    ];
    return util.typeCheck('object', symbol, loop);
  } else if (schema.properties) {
    // Static list of properties to check
    const checks = _.flatMap(schema.properties, (subSchema, key) => {
      const fnSym = context.symbolForSchema(subSchema);
      const sym = context.gensym();
      return [
        `var ${sym} = ${symbol}.${key};`,
        ...util.ifs(
          `${sym} !== undefined`,
          util.ifs(
            `${fnSym}(${sym}) !== null`,
            context.error(),
          ),
        ),
      ];
    });
    return util.typeCheck('object', symbol, checks);
  } else {
    return [];
  }
};

export default properties;
