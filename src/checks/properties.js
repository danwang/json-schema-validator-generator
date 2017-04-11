// @flow
import _ from 'lodash';
import root from './root.js';
import util from '../util.js';
import type {Context} from '../index.js';

const additionalBody = (
  additionalProperties: Object | false,
  symbol: string,
  context: Context,
): Array<string> => {
  if (additionalProperties === false) {
    return context.error();
  } else {
    return root(additionalProperties, symbol, context);
  }
};

const _additional = (
  additionalProperties: Object | false,
  hitSym: string,
  valSym: string,
  context: Context,
): Array<string> => {
  return [
    `if (${hitSym} === false) {`,
    ...additionalBody(additionalProperties, valSym, context).map(util.indent),
    '}',
  ];
};

const _additionalProperties = (
  properties: ?Object,
  patternProperties: ?Object,
  additionalProperties: ?Object,
  keySym: string,
  valSym: string,
  hitSym: string,
  context: Context,
): Array<string> => {
  // Check all properties
  const propertyChecks = _.flatMap(properties, (subSchema, key) => {
    return [
      `if (${keySym} === "${key}") {`,
      ...root(subSchema, valSym, context).map(util.indent),
      util.indent(`${hitSym} = true;`),
      '}',
    ];
  });

  const patternChecks = _.flatMap(patternProperties, (subSchema, pattern) => {
    return [
      `if (${keySym}.match(/${pattern}/)) {`,
      ...root(subSchema, valSym, context).map(util.indent),
      util.indent(`${hitSym} = true;`),
      '}',
    ];
  });

  return [
    ...propertyChecks,
    ...patternChecks,
  ];
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
    const hitSym = context.gensym();

    const loop = [
      `for (var ${keySym} in ${symbol}) {`,
      util.indent(`var ${valSym} = ${symbol}[${keySym}];`),
      util.indent(`var ${hitSym} = false;`),
      ..._additionalProperties(
        schema.properties,
        schema.patternProperties,
        schema.additionalProperties,
        keySym,
        valSym,
        hitSym,
        context,
      ).map(util.indent),
      ...(
        schema.additionalProperties !== undefined ?
        _additional(schema.additionalProperties, hitSym, valSym, context) :
        []
      ).map(util.indent),
      '}',
    ];
    return util.typeCheck('object', symbol, loop);
  } else if (schema.properties) {
    // Static list of properties to check
    const checks = _.flatMap(schema.properties, (subSchema, key) => {
      const sym = context.gensym();
      return [
        `var ${sym} = ${symbol}.${key};`,
        `if (${sym} !== undefined) {`,
        ...root(subSchema, sym, context).map(util.indent),
        '}',
      ];
    });
    return util.typeCheck('object', symbol, checks);
  } else {
    return [];
  }
};

export default properties;
