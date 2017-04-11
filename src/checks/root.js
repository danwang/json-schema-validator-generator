// @flow
import allOf from './allOf.js';
import anyOf from './anyOf.js';
import _enum from './enum.js';
import items from './items.js';
import maxItems from './maxItems.js';
import maxLength from './maxLength.js';
import maxProperties from './maxProperties.js';
import maximum from './maximum.js';
import minItems from './minItems.js';
import minLength from './minLength.js';
import minProperties from './minProperties.js';
import minimum from './minimum.js';
import not from './not.js';
import oneOf from './oneOf.js';
import pattern from './pattern.js';
import properties from './properties.js';
import required from './required.js';
import type from './type.js';

import type {Context} from '../index.js';

const root = (schema: Object, symbol: string, context: Context): Array<string> => {
  return [
    ...allOf(schema, symbol, context),
    ...anyOf(schema, symbol, context),
    ..._enum(schema, symbol, context),
    ...items(schema, symbol, context),
    ...maxItems(schema, symbol, context),
    ...maxLength(schema, symbol, context),
    ...maxProperties(schema, symbol, context),
    ...maximum(schema, symbol, context),
    ...minItems(schema, symbol, context),
    ...minLength(schema, symbol, context),
    ...minProperties(schema, symbol, context),
    ...minimum(schema, symbol, context),
    ...not(schema, symbol, context),
    ...oneOf(schema, symbol, context),
    ...pattern(schema, symbol, context),
    ...properties(schema, symbol, context),
    ...required(schema, symbol, context),
    ...type(schema, symbol, context),
  ];
};

export default root;
