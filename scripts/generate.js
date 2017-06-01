// @noflow
const _ = require('lodash');
const path = require('path');
const fs = require('fs');
const generator = require(path.join(__dirname, '../dist/index.js')).default;
const spec = require(path.join(__dirname, '../json-schema-draft-04.json'));

const FLOW_OUTPUT = path.join(__dirname, '../src/generated-types.js');
const JS_OUTPUT = path.join(__dirname, '../src/generated-validator.js');

const generated = generator(spec, {JsonSchema: spec});

const flowContents = `// @flow
/* eslint-disable */
${generated.flow}
`;
const jsContents = `// @noflow
/* eslint-disable */
export default ${generated.js};
`;

fs.writeFileSync(FLOW_OUTPUT, flowContents);
fs.writeFileSync(JS_OUTPUT, jsContents);
