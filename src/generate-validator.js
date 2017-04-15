// @flow
import root from './checks/root.js';
import Ast from './jsast/ast.js';
import simplify from './jsast/simplify.js';
import render from './jsast/render.js';

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

  const context = {
    gengensym,
    gensym,
    error: () => Ast.Return('"error"'),
    symbolForSchema: (schm: Object): string => {
      if (!cache.has(schm)) {
        cache.set(schm, gensym('f'));
        schemas.push(schm);
      }
      return (cache.get(schm): any);
    },
  };

  const results = [root(schema, context)];
  let i = 1;
  while (i < schemas.length) {
    results.push(root(schemas[i], context));
    i++;
  }
  const simplified = simplify(Ast.Body(
    ...results,
    Ast.Return(context.symbolForSchema(schema)),
  ));
  // console.log(JSON.stringify(simplified, null, 2));
  // console.log(render(simplified));
  return render(simplified);
};

export default generateValidator;
