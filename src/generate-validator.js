// @flow
import root from './checks/root.js';

const gengensym = () => {
  const cache = {};
  return (prefix: string = 'v') => {
    cache[prefix] = cache[prefix] || 0;
    return `${prefix}${cache[prefix]++}`;
  };
};

const generateValidator = (schema: Object) => {
  const gensym = gengensym();

  const cache = new WeakMap();
  const schemas = [];

  const context = {
    gensym,
    error: () => ['return "error";'],
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
  return [
    ...results.map((l) => l.join('\n')),
    `return ${context.symbolForSchema(schema)};`,
  ].join('\n');
};

export default generateValidator;
