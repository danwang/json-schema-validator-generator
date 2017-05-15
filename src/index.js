// @flow
import validator from 'generated-validator.js';
import generateFlow from 'flow/generate.js';
import generateValidator from 'js/generate.js';

type Schemas = {[key: string]: JsonSchema};
type Generated = {
  flow: string,
  js: string,
};

const generate = (anything: mixed, anyShape: Object = {root: anything}): Generated => {
  if (validator.JsonSchema(anything) !== 0) {
    throw new Error('Invalid schema.');
  } else {
    const schema: JsonSchema = (anything: any);
    const shape: Schemas = (anyShape: any);
    return {
      flow: generateFlow(schema, shape),
      js: generateValidator(schema, shape),
    };
  }
};

export default generate;
