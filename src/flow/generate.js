// @flow
import _ from 'lodash';
import makeAst from 'flow/make-ast.js';
import render from 'flow/render.js';
import jsonpointer from 'json-pointer';
import Ast from 'flow/ast/ast.js';
import util from 'util.js';

type Schemas = {[key: string]: JsonSchema};
// Accepts the same arguments as js/generate
const generate = (schema: JsonSchema, shape: Schemas = {root: schema}): string => {
  const gensym = util.gengensym();

  const cache = new WeakMap(_.map(shape, (subSchema, name) => [subSchema, name]));
  const schemas = _.values(shape);

  const symbolForSchema = (schm: JsonSchema): string => {
    if (!cache.has(schm)) {
      cache.set(schm, gensym('T'));
      schemas.push(schm);
    }
    return (cache.get(schm): any);
  };

  const refResolver = (ref: string): ?string => {
    if (ref.startsWith('#')) {
      const subSchema = jsonpointer.get(schema, decodeURIComponent(ref.substring(1)));
      return symbolForSchema(subSchema);
    } else {
      return null;
    }
  };

  const results = {};
  let i = 0;
  while (i < schemas.length) {
    const name = symbolForSchema(schemas[i]);
    results[name] = makeAst(schemas[i], refResolver);
    i++;
  }

  return _.map(results, (ast, name) => {
    if (shape[name]) {
      return render(Ast.Declaration(name, ast));
    } else {
      return render(Ast.Type(name, ast));
    }
  }).join('\n');
};
export default generate;
