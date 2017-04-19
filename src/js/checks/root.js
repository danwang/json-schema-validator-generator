// @flow
import allOf from 'js/checks/allOf.js';
import anyOf from 'js/checks/anyOf.js';
import dependencies from 'js/checks/dependencies.js';
import _enum from 'js/checks/enum.js';
import items from 'js/checks/items.js';
import comparisons from 'js/checks/comparisons.js';
import multipleOf from 'js/checks/multipleOf.js';
import not from 'js/checks/not.js';
import oneOf from 'js/checks/oneOf.js';
import pattern from 'js/checks/pattern.js';
import properties from 'js/checks/properties.js';
import ref from 'js/checks/ref.js';
import required from 'js/checks/required.js';
import type from 'js/checks/type.js';
import uniqueItems from 'js/checks/uniqueItems.js';

import type {Context} from 'types.js';

import Ast from 'js/jsast/ast.js';
import type {Function1Type} from 'js/jsast/ast.js';

const root = (schema: Object, context: Context): Function1Type => {
  const fnSym = context.symbolForSchema(schema);
  const symbol = context.gensym();

  const body = Ast.Body(
    // $ref needs to be first because it ignores everything else
    ref(schema, symbol, context),
    allOf(schema, symbol, context),
    anyOf(schema, symbol, context),
    dependencies(schema, symbol, context),
    _enum(schema, symbol, context),
    items(schema, symbol, context),
    comparisons(schema, symbol, context),
    multipleOf(schema, symbol, context),
    not(schema, symbol, context),
    oneOf(schema, symbol, context),
    pattern(schema, symbol, context),
    properties(schema, symbol, context),
    required(schema, symbol, context),
    type(schema, symbol, context),
    uniqueItems(schema, symbol, context),
  );

  return Ast.Function1(
    fnSym,
    symbol,
    Ast.Body(body, Ast.Return('null')),
  );
};

export default root;
