// @flow
import _ from 'lodash';
import root from 'js/checks/root.js';
import Ast from 'js/ast/ast.js';
import simplify from 'js/ast/simplify.js';
import getErrors from 'js/ast/get-errors.js';
import replaceErrors from 'js/ast/replace-errors.js';
import render from 'js/ast/render.js';
import uniqFuncs from 'js/ast/uniq-funcs.js';
import util from 'util.js';
import type {JsAst, VarType} from 'js/ast/ast.js';
import type {JsonSchema} from 'generated-types.js';
import prettier from 'prettier';

const gengensym = () => {
  const g = util.gengensym();
  return (...args) => Ast.Var(g(...args));
};

export type Context = {
  gensym: () => VarType,
  error: (JsonSchema, string, subreason?: JsAst) => JsAst,
  symbolForSchema: (schema: JsonSchema) => VarType,
  rootSchema: JsonSchema,
};

type Schemas = {[key: string]: JsonSchema};
// Given a root schema and a shape (map of schemas), returns a string which, if
// run in the body of a function, returns an object of the same shape whose
// values are validators for the schemas.
//
// If no shape is passed, {root} is used.
const generateValidator = (
  schema: JsonSchema,
  shape: Schemas = {root: schema}
): string => {
  const gensym = gengensym();

  const cache = new WeakMap();
  const schemas = [];

  const symbolForSchema = (schm: JsonSchema): VarType => {
    if (!cache.has(schm)) {
      const match = _.find(schemas, s => _.isEqual(s, schm));
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
    error: (subSchema: JsonSchema, reason: string, subreason?: JsAst) =>
      Ast.Error(subSchema, reason, subreason),
    symbolForSchema,
    rootSchema: schema,
  });

  const baseSchemas = _.map(shape, subSchema => root(subSchema, makeContext()));
  const results = _.keyBy(baseSchemas, f => f.name.value);
  let i = 1;
  while (i < schemas.length) {
    const next = root(schemas[i], makeContext());
    results[next.name.value] = next;
    i++;
  }

  // TODO: Fix flow unhelpful error
  const simplifiedResults: any = _.values(results).map(simplify);

  const schemaObject = _.mapValues(shape, subSchema =>
    symbolForSchema(subSchema)
  );
  const ast = Ast.Body(
    ...simplifiedResults,
    Ast.Return(Ast.ObjectLiteral(schemaObject))
  );
  const nameForSchema = subSchema => {
    return (
      _.findKey(shape, s => s === subSchema) || symbolForSchema(subSchema).value
    );
  };
  const errors = getErrors(ast);
  const replaced = replaceErrors(ast, errors, nameForSchema);
  const simplified = simplify(uniqFuncs(simplify(replaced)));

  const body = render(simplified, 1);
  const generated = ['(function() {', body, '}())'].join('\n');
  return prettier.format(generated, {
    singleQuote: true,
    trailingComma: 'es5',
    bracketSpacing: false,
    parser: 'flow',
  });
};

export default generateValidator;
