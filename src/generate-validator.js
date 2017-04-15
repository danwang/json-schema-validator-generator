// @flow
import _ from 'lodash';
import root from './checks/root.js';
import Ast from './jsast/ast.js';
import simplify from './jsast/simplify.js';
import render from './jsast/render.js';
import uniqFuncs from './jsast/uniq-funcs.js';
import type {Function1Type} from './jsast/ast.js';

const gengensym = () => {
  const cache = {};
  return (prefix: string = 'v') => {
    cache[prefix] = cache[prefix] || 0;
    return `${prefix}${cache[prefix]++}`;
  };
};

const generateValidator = (schema: Object): string => {
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

  const error = () => Ast.Return('"error"');

  const makeContext = () => ({
    gensym: gengensym(),
    error,
    symbolForSchema,
  });

  const results: Array<Function1Type> = [root(schema, makeContext())];
  let i = 1;
  while (i < schemas.length) {
    results.push(root(schemas[i], makeContext()));
    i++;
  }
  const simplified = simplify(Ast.Body(
    ...uniqFuncs(results),
    Ast.Return(symbolForSchema(schema)),
  ));
  // console.log(JSON.stringify(simplified, null, 2));
  // console.log(render(simplified));
  return render(simplified);
};

export default generateValidator;
