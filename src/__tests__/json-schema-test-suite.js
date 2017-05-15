// @flow
import _ from 'lodash';
import path from 'path';
import fs from 'fs';
import generateValidator from 'js/generate.js';

const WHITELIST = [
  'additionalItems.json',
  'additionalProperties.json',
  'allOf.json',
  'anyOf.json',
  'default.json',
  // 'definitions.json',
  'dependencies.json',
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
  'multipleOf.json',
  'not.json',
  'oneOf.json',
  'optional.json',
  'pattern.json',
  'patternProperties.json',
  'properties.json',
  'ref.json',
  // 'refRemote.json',
  'required.json',
  'type.json',
  'uniqueItems.json',
];
const SKIPPED_TESTS = {
  'items.json': {
    'an array of schemas for items': {
      'JavaScript pseudo-array is valid': false,
    },
  },
  'maxLength.json': {
    'maxLength validation': {
      'two supplementary Unicode code points is long enough': false,
    },
  },
  'minLength.json': {
    'minLength validation': {
      'one supplementary Unicode code point is not long enough': false,
    },
  },
  'ref.json': {
    'remote ref, containing refs itself': {
      'remote ref invalid': false,
    },
    'Recursive references between schemas': {
      'invalid tree': false,
    },
  },
};

describe('JSON Schema test suite', () => {
  const testsPath = path.join(__dirname, '../../', 'JSON-Schema-Test-Suite/tests/draft4/');
  const testFiles = fs.readdirSync(testsPath)
    .filter((fileName) => WHITELIST.indexOf(fileName) >= 0);
  testFiles.forEach((fileName) => {
    describe(fileName, () => {
      // $FlowFixMe Dynamic require for DRY
      const groups = require(path.join(testsPath, fileName));
      groups.forEach((group) => {
        const {description, schema, tests} = group;
        const code = generateValidator(schema);
        it('matches snapshot', () => {
          expect(code).toMatchSnapshot();
        });
        const validator = eval(code).root; // eslint-disable-line no-eval
        tests.forEach((test) => {
          describe(description, () => {
            const {description: testDescription, data, valid} = test;
            if (_.get(SKIPPED_TESTS, [fileName, description, testDescription], true)) {
              it(description, () => {
                expect(validator(data) === null).toBe(valid);
              });
            }
          });
        });
      });
    });
  });
});
