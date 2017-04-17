// @flow
import _ from 'lodash';
import root from './checks/root.js';
import Ast from './jsast/ast.js';
import simplify from './jsast/simplify.js';
import render from './jsast/render.js';
import uniqFuncs from './jsast/uniq-funcs.js';
import type {Transform} from './jsast/transform.js';

const gengensym = () => {
  const cache = {};
  return (prefix: string = 'v') => {
    cache[prefix] = cache[prefix] || 0;
    return `${prefix}${cache[prefix]++}`;
  };
};

type Schemas = {[key: string]: Object};
// Given a root schema and a shape (map of schemas), returns a string which, if
// run in the body of a function, returns an object of the same shape whose
// values are validators for the schemas.
//
// If no shape is passed, {root} is used.
const generateValidator = (schema: Object, shape: Schemas = {root: schema}): string => {
  const gensym = gengensym();

  const cache = new WeakMap();
  const schemas = [];

  const symbolForSchema = (schm: Object): string => {
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
    error: () => Ast.Return('"error"'),
    symbolForSchema,
    rootSchema: schema,
  });

  const results = _.map(shape, (subSchema) => root(subSchema, makeContext()));
  let i = 1;
  while (i < schemas.length) {
    results.push(root(schemas[i], makeContext()));
    i++;
  }

  // TODO: Fix flow unhelpful error
  const simplifiedResults: any = results.map(simplify);
  const uniquer: Transform = uniqFuncs(simplifiedResults);

  const schemaObject = _.mapValues(shape, (subSchema) => Ast.Literal(symbolForSchema(subSchema)));
  const ast = Ast.Body(
    ...simplifiedResults,
    Ast.Return(Ast.ObjectLiteral(schemaObject)),
  );
  // console.log(JSON.stringify(simplified, null, 2));
  return render(uniquer(simplify(ast)));
};

export default generateValidator;
