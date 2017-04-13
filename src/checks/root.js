// @flow
import allOf from './allOf.js';
import anyOf from './anyOf.js';
import _enum from './enum.js';
import items from './items.js';
import comparisons from './comparisons.js';
import not from './not.js';
import oneOf from './oneOf.js';
import pattern from './pattern.js';
import properties from './properties.js';
import required from './required.js';
import type from './type.js';

import type {Context} from '../types.js';

const root = (schema: Object, symbol: string, context: Context): Array<string> => {
  return [
    ...allOf(schema, symbol, context),
    ...anyOf(schema, symbol, context),
    ..._enum(schema, symbol, context),
    ...items(schema, symbol, context),
    ...comparisons(schema, symbol, context),
    ...not(schema, symbol, context),
    ...oneOf(schema, symbol, context),
    ...pattern(schema, symbol, context),
    ...properties(schema, symbol, context),
    ...required(schema, symbol, context),
    ...type(schema, symbol, context),
  ];
};

export default root;
