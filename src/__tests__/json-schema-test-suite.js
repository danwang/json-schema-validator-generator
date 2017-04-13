// @flow
import path from 'path';
import fs from 'fs';
import generateValidator from '../generate-validator.js';

const WHITELIST = [
  // 'additionalItems.json',
  'additionalProperties.json',
  'allOf.json',
  'anyOf.json',
  'default.json',
  // 'definitions.json',
  // 'dependencies.json',
  'enum.json',
  'items.json',
  'maxItems.json',
  'maxLength.json',
  'maxProperties.json',
  'maximum.json',
  'minItems.json',
  'minLength.json',
  'minProperties.json',
  'minimum.json',
  // 'multipleOf.json',
  'not.json',
  'oneOf.json',
  'optional',
  'pattern.json',
  'patternProperties.json',
  'properties.json',
  // 'ref.json',
  // 'refRemote.json',
  'required.json',
  'type.json',
  // 'uniqueItems.json',
];

const singleTest = (test, code, validator) => {
  const {description, data, valid} = test;
  it(description, () => {
    expect(validator(data).length === 0).toBe(valid);
  });
};

const testGroup = (group) => {
  const {description, schema, tests} = group;
  const code = generateValidator(schema, 'validator');
  it('matches snapshot', () => {
    expect(code).toMatchSnapshot();
  });
  const validator = eval(`(function(){return ${code};})()`); // eslint-disable-line no-eval
  describe(description, () => {
    tests.forEach((test) => singleTest(test, code, validator));
  });
};

const testFile = (testsPath, fileName) => {
  // $FlowFixMe Dynamic require for DRY
  const groups = require(path.join(testsPath, fileName));
  if (WHITELIST.indexOf(fileName) >= 0) {
    describe(fileName, () => {
      groups.forEach(testGroup);
    });
  }
};

const testsPath = path.join(__dirname, '../../', 'JSON-Schema-Test-Suite/tests/draft4/');
fs.readdirSync(testsPath).forEach((fileName) => {
  if (fileName.match(/.*\.json$/)) {
    testFile(testsPath, fileName);
  }
});
