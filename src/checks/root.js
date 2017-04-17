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
import ref from './ref.js';
import required from './required.js';
import type from './type.js';

import type {Context} from '../types.js';

import Ast from '../jsast/ast.js';
import type {Function1Type} from '../jsast/ast.js';

const root = (schema: Object, context: Context): Function1Type => {
  const fnSym = context.symbolForSchema(schema);
  const symbol = context.gensym();

  const body = Ast.Body(
    // $ref needs to be first because it ignores everything else
    ref(schema, symbol, context),
    allOf(schema, symbol, context),
    anyOf(schema, symbol, context),
    _enum(schema, symbol, context),
    items(schema, symbol, context),
    comparisons(schema, symbol, context),
    not(schema, symbol, context),
    oneOf(schema, symbol, context),
    pattern(schema, symbol, context),
    properties(schema, symbol, context),
    required(schema, symbol, context),
    type(schema, symbol, context),
  );

  return Ast.Function1(
    fnSym,
    symbol,
    Ast.Body(body, Ast.Return('null')),
  );
};

export default root;
