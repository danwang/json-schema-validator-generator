// @flow
import _ from 'lodash';
import generateFlowAsts from 'flow/generateFlowAsts.js';
import render from 'flow/render.js';

type Schemas = {[key: string]: JsonSchema};
// Accepts the same arguments as js/generate
const generate = (schema: JsonSchema, shape: Schemas = {root: schema}): string => {
  const asts = generateFlowAsts(schema, shape);
  return _.map(asts, (ast) => render(ast)).join('\n');
};
export default generate;
