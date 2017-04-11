// @flow
import util from './util.js';
import root from './checks/root.js';

export type Context = {
  gensym: () => string,
  error: () => Array<string>,
};

const generate = (schema: Object, symbol: string) => {
  const gensym = util.gengensym();
  const errorSym = gensym();

  const context = {
    gensym,
    error: () => [`${errorSym}.push(true);`],
  };

  return [
    `var ${errorSym} = [];`,
    ...root(schema, symbol, context),
    `return ${errorSym};`,
  ].join('\n');
};

export default generate;
