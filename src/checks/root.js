// @flow
import allOf from 'jsvg/checks/allOf.js';
import anyOf from 'jsvg/checks/anyOf.js';
import _enum from 'jsvg/checks/enum.js';
import items from 'jsvg/checks/items.js';
import comparisons from 'jsvg/checks/comparisons.js';
import not from 'jsvg/checks/not.js';
import oneOf from 'jsvg/checks/oneOf.js';
import pattern from 'jsvg/checks/pattern.js';
import properties from 'jsvg/checks/properties.js';
import ref from 'jsvg/checks/ref.js';
import required from 'jsvg/checks/required.js';
import type from 'jsvg/checks/type.js';

import type {Context} from 'jsvg/types.js';

import Ast from 'jsvg/jsast/ast.js';
import type {Function1Type} from 'jsvg/jsast/ast.js';

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
