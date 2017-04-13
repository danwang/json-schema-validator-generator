// @flow
import util from './util.js';
import root from './checks/root.js';

const generateValidator = (schema: Object, name: string) => {
  const gensym = util.gengensym();
  const argSym = gensym();
  const errorSym = gensym();

  const context = {
    gensym,
    error: () => [`${errorSym}.push(true);`],
  };

  const body = [
    `var ${errorSym} = [];`,
    ...root(schema, argSym, context),
    `return ${errorSym};`,
  ];

  return [
    `function(${argSym}) {`,
    ...body.map(util.indent),
    '}',
  ].join('\n');
};

export default generateValidator;
