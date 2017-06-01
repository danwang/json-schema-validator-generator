// @flow
import _ from 'lodash';
import makeAst from 'flow/make-ast.js';
import jsonpointer from 'json-pointer';
import Ast from 'flow/ast/ast.js';
import util from 'util.js';
import type {FlowAst} from 'flow/ast/ast.js';

type Schemas = {[key: string]: JsonSchema};
const generateFlowAsts = (schema: JsonSchema, shape: Schemas = {root: schema}): Array<FlowAst> => {
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

  return _.map(results, (ast, name) => Ast.Type(name, ast));
};

export default generateFlowAsts;
