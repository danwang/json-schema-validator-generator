// @flow
import _ from 'lodash';
import root from 'js/checks/root.js';
import Ast from 'js/jsast/ast.js';
import simplify from 'js/jsast/simplify.js';
import render from 'js/jsast/render.js';
import uniqFuncs from 'js/jsast/uniq-funcs.js';
import util from 'util.js';
import type {VarType} from 'js/jsast/ast.js';

const gengensym = () => {
  const g = util.gengensym();
  return (...args) => Ast.Var(g(...args));
};

type Schemas = {[key: string]: JsonSchema};
// Given a root schema and a shape (map of schemas), returns a string which, if
// run in the body of a function, returns an object of the same shape whose
// values are validators for the schemas.
//
// If no shape is passed, {root} is used.
const generateValidator = (schema: JsonSchema, shape: Schemas = {root: schema}): string => {
  const gensym = gengensym();

  const cache = new WeakMap();
  const schemas = [];

  const symbolForSchema = (schm: JsonSchema): VarType => {
    if (!cache.has(schm)) {
      const match = _.find(schemas, (s) => _.isEqual(s, schm));
      if (match) {
        cache.set(schm, cache.get(match));
      } else {
        cache.set(schm, gensym('f'));
        schemas.push(schm);
      }
    }
    return (cache.get(schm): any);
  };

  const makeContext = () => ({
    gensym: gengensym(),
    error: () => Ast.Return(Ast.StringLiteral('error')),
    symbolForSchema,
    rootSchema: schema,
  });

  const baseSchemas = _.map(shape, (subSchema) => root(subSchema, makeContext()));
  const results = _.keyBy(baseSchemas, (f) => f.name.value);
  let i = 1;
  while (i < schemas.length) {
    const next = root(schemas[i], makeContext());
    results[next.name.value] = next;
    i++;
  }

  // TODO: Fix flow unhelpful error
  const simplifiedResults: any = _.values(results).map(simplify);

  const schemaObject = _.mapValues(shape, (subSchema) => symbolForSchema(subSchema));
  const ast = Ast.Body(
    ...simplifiedResults,
    Ast.Return(Ast.ObjectLiteral(schemaObject)),
  );
  const body = render(simplify(uniqFuncs(simplify(ast))), 1);
  return [
    '(function() {',
    body,
    '})()',
  ].join('\n');
};

export default generateValidator;
