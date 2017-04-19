// @noflow
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const generator = require(path.join(__dirname, '../dist/index.js')).default;
const spec = require(path.join(__dirname, '../openapi/openapi/spec2.json'));

const FLOW_OUTPUT = path.join(__dirname, 'flow-types.js');
const JS_OUTPUT = path.join(__dirname, 'validators.js');

const MODELS = {
  Charge: 'charge',
  Customer: 'customer',
};

const generated = generator(spec, _.mapValues(MODELS, (key) => spec.definitions[key]));

const flowContents = generated.flow;
const jsContents = `export default ${generated.js};`;

fs.writeFileSync(FLOW_OUTPUT, flowContents);
fs.writeFileSync(JS_OUTPUT, jsContents);
