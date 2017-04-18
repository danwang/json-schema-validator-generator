// @flow
import makeAst from 'jsvg/flow/make-ast.js';
import render from 'jsvg/flow/render.js';

const generate = (schema: Object) => render(makeAst(schema), 0);
export default generate;
