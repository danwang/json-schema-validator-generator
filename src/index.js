// @flow
import generateFlow from 'jsvg/flow/generate.js';
import generateValidator from 'jsvg/js/generate.js';

type Schemas = {[key: string]: Object};
type Generated = {
  flow: string,
  js: string,
};

const generate = (schema: Object, shape: Schemas = {root: schema}): Generated => {
  return {
    flow: generateFlow(schema, shape),
    js: generateValidator(schema, shape),
  };
};

export default generate;
