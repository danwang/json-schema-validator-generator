// @flow
import _ from 'lodash';
import makeAst from 'flow/make-ast.js';
import render from 'flow/render.js';
import jsonpointer from 'json-pointer';
import Ast from 'flow/ast/ast.js';

type Schemas = {[key: string]: Object};
// Accepts the same arguments as js/generate
const generate = (schema: Object, shape: Schemas = {root: schema}): string => {
  const refResolver = (ref: string): ?string => {
    if (ref.startsWith('#')) {
      const subSchema = jsonpointer.get(schema, decodeURIComponent(ref.substring(1)));
      return _.find(Object.keys(shape), (key) => shape[key] === subSchema);
    } else {
      return null;
    }
  };

  return _.map(shape, (subSchema, name) => {
    const ast = makeAst(subSchema, refResolver);
    return render(Ast.Declaration(name, ast));
  }).join('\n');
};
export default generate;
